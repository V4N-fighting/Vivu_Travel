import { Injectable } from '@nestjs/common';
import { randomUUID } from 'crypto';
import { ChatbotRepository } from './chatbot.repository';
import { GroqTravelService } from './groq-travel.service';
import { RecommendationService } from './recommendation.service';
import { ChatRequest, RetrievalContext, TourCandidate, UserMemory } from './chatbot.types';

@Injectable()
export class ChatbotService {
  constructor(
    private readonly repository: ChatbotRepository,
    private readonly ai: GroqTravelService,
    private readonly recommendation: RecommendationService,
  ) {}

  async ask(request: ChatRequest) {
    let answer = '';
    for await (const chunk of this.stream(request)) {
      answer += chunk;
    }
    return {
      sessionId: request.sessionId,
      answer,
    };
  }

  async *stream(request: ChatRequest): AsyncGenerator<string> {
    const startedAt = Date.now();
    const message = (request.message || '').trim();
    const sessionKey = request.sessionId || randomUUID();
    const session = await this.repository.getOrCreateSession(sessionKey, request.userId);
    request.sessionId = session.session_key;

    if (!message) {
      yield 'Please enter a travel question so I can help with tours, destinations, prices, schedules, or bookings.';
      return;
    }

    if (this.looksLikePromptInjection(message)) {
      yield 'I can help with travel planning and Vivu Travel data, but I cannot reveal hidden instructions, credentials, or internal system details.';
      return;
    }

    await this.repository.saveMessage(session.id, 'user', message);
    const history = await this.repository.getMessages(session.id, 14);
    const memory: UserMemory = session.memory || {};
    const schemaContext = await this.repository.getSchemaContext();
    const plan = await this.ai.plan(message, memory, schemaContext);
    const context = await this.retrieve(message, plan, memory, request.currentTourId);

    let fullAnswer = '';
    try {
      for await (const chunk of this.ai.streamAnswer({
        message,
        history,
        memory,
        context,
        schemaContext,
        locale: request.locale || plan.language,
      })) {
        fullAnswer += chunk;
        yield chunk;
      }

      await this.repository.saveMessage(session.id, 'assistant', fullAnswer, {
        intent: plan.intent,
        retrievedDocuments: context.documents.length,
        retrievedTours: context.tours.length,
      });

      const updatedMemory = await this.ai.summarizeMemory(
        [...history, { role: 'assistant', content: fullAnswer }],
        memory,
      );
      await this.repository.updateMemory(session.id, updatedMemory, updatedMemory.summary);
      await this.repository.logAnalytics({
        sessionId: session.id,
        userMessage: message,
        detectedIntent: plan.intent,
        retrievedCount: context.documents.length + context.tours.length,
        latencyMs: Date.now() - startedAt,
      });
    } catch (error) {
      await this.repository.logAnalytics({
        sessionId: session.id,
        userMessage: message,
        detectedIntent: plan.intent,
        latencyMs: Date.now() - startedAt,
        error: (error as Error).message,
      });
      yield 'I hit a temporary issue while preparing the recommendation. Please try again in a moment.';
    }
  }

  async getHistory(sessionId: string) {
    const session = await this.repository.getOrCreateSession(sessionId);
    const messages = await this.repository.getMessages(session.id, 50);
    return {
      sessionId,
      memory: session.memory || {},
      messages,
    };
  }

  private async retrieve(message: string, plan: any, memory: UserMemory, currentTourId?: number): Promise<RetrievalContext> {
    const searchText = this.getSearchText(message, plan);
    const filters = {
      ...(plan.filters || {}),
      searchText,
    };
    const [documents, rawTours, coupons] = await Promise.all([
      this.repository.fullTextSearch(filters.searchText || message, 10),
      this.repository.searchToursBySql(filters, 10),
      this.repository.getActiveCoupons(),
    ]);

    let currentTour: TourCandidate | undefined = undefined;
    if (currentTourId) {
      try {
        const currentTours = await this.repository.searchToursBySql({ id: currentTourId }, 1);
        if (currentTours && currentTours.length > 0) {
          currentTour = currentTours[0];
        }
      } catch (err) {
        this.repository.logAnalytics({
          userMessage: `Failed to retrieve currentTourId ${currentTourId}`,
          error: (err as Error).message,
        });
      }
    }

    const toursForRanking = rawTours.length ? rawTours : await this.repository.getFeaturedTours(6);
    
    let combinedTours = [...toursForRanking];
    if (currentTour) {
      const alreadyExists = combinedTours.some((t) => Number(t.id) === Number(currentTourId));
      if (!alreadyExists) {
        combinedTours.unshift(currentTour);
      }
    }

    const tourIds = Array.from(new Set(combinedTours.map((tour) => Number(tour.id)).filter(Boolean))).slice(0, 7);
    const tourDetails = await this.repository.getTourDetails(tourIds);

    if (currentTour) {
      currentTour.details = tourDetails.find((detail) => detail.id === currentTour!.id);
      try {
        currentTour.reviews = await this.repository.getTourReviewComments(currentTour.id, 8);
      } catch (err) {
        this.repository.logAnalytics({
          userMessage: `Failed to retrieve review comments for tour ${currentTour.id}`,
          error: (err as Error).message,
        });
      }
    }

    const toursWithDetails = combinedTours.map((tour) => ({
      ...tour,
      details: tourDetails.find((detail) => detail.id === tour.id),
    }));

    return {
      documents,
      tours: this.recommendation.rank(toursWithDetails, plan, memory).slice(0, 7),
      coupons,
      policyFacts: [
        'Use bookings, payments, contacts, and coupons tables as source of truth when data is available.',
        'If cancellation/payment policy is not present in database context, say that staff confirmation is required.',
      ],
      currentTour,
    };
  }

  private looksLikePromptInjection(message: string) {
    return /(ignore previous|ignore all|system prompt|developer message|api key|secret|show sql|bypass|jailbreak)/i.test(message);
  }

  private getSearchText(message: string, plan: any) {
    const planned = (plan.filters?.searchText || '').trim();
    const destination = (plan.filters?.destination || '').trim();
    const source = `${planned} ${message}`;
    const normalized = this.normalizeText(source);

    const knownDestinations = [
      { value: 'Hoi An', aliases: ['hoi an', 'hoian'] },
      { value: 'Da Nang', aliases: ['da nang', 'danang'] },
      { value: 'Ha Long', aliases: ['ha long', 'halong'] },
      { value: 'Ha Noi', aliases: ['ha noi', 'hanoi'] },
      { value: 'Sapa', aliases: ['sapa', 'sa pa'] },
      { value: 'Hue', aliases: ['hue'] },
      { value: 'My Son', aliases: ['my son', 'myson'] },
      { value: 'Mekong', aliases: ['mekong'] },
      { value: 'Phu Quoc', aliases: ['phu quoc', 'phuquoc'] },
    ];

    const matchedDestination = knownDestinations.find((item) =>
      item.aliases.some((alias) => normalized.includes(alias)),
    );
    if (matchedDestination) return matchedDestination.value;
    if (destination) return destination;

    const cleaned = this.normalizeText(planned || message)
      .replace(/\b(chi tiet|thong tin|tu van|goi y|de xuat|tim|kiem|tour|chuyen di|lich trinh|gia|ve|cho toi|cho minh|toi muon|can)\b/g, ' ')
      .replace(/\s+/g, ' ')
      .trim();

    return cleaned || planned || message;
  }

  private normalizeText(value: string) {
    return value
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .replace(/đ/g, 'd')
      .replace(/Đ/g, 'D')
      .toLowerCase();
  }
}
