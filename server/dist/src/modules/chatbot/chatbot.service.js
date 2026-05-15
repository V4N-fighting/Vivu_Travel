"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ChatbotService = void 0;
const common_1 = require("@nestjs/common");
const crypto_1 = require("crypto");
const chatbot_repository_1 = require("./chatbot.repository");
const gemini_travel_service_1 = require("./gemini-travel.service");
const recommendation_service_1 = require("./recommendation.service");
let ChatbotService = class ChatbotService {
    constructor(repository, gemini, recommendation) {
        this.repository = repository;
        this.gemini = gemini;
        this.recommendation = recommendation;
    }
    async ask(request) {
        let answer = '';
        for await (const chunk of this.stream(request)) {
            answer += chunk;
        }
        return {
            sessionId: request.sessionId,
            answer,
        };
    }
    async *stream(request) {
        const startedAt = Date.now();
        const message = (request.message || '').trim();
        const sessionKey = request.sessionId || (0, crypto_1.randomUUID)();
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
        const memory = session.memory || {};
        const schemaContext = await this.repository.getSchemaContext();
        const plan = await this.gemini.plan(message, memory, schemaContext);
        const context = await this.retrieve(message, plan, memory);
        let fullAnswer = '';
        try {
            for await (const chunk of this.gemini.streamAnswer({
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
            const updatedMemory = await this.gemini.summarizeMemory([...history, { role: 'assistant', content: fullAnswer }], memory);
            await this.repository.updateMemory(session.id, updatedMemory, updatedMemory.summary);
            await this.repository.logAnalytics({
                sessionId: session.id,
                userMessage: message,
                detectedIntent: plan.intent,
                retrievedCount: context.documents.length + context.tours.length,
                latencyMs: Date.now() - startedAt,
            });
        }
        catch (error) {
            await this.repository.logAnalytics({
                sessionId: session.id,
                userMessage: message,
                detectedIntent: plan.intent,
                latencyMs: Date.now() - startedAt,
                error: error.message,
            });
            yield 'I hit a temporary issue while preparing the recommendation. Please try again in a moment.';
        }
    }
    async getHistory(sessionId) {
        const session = await this.repository.getOrCreateSession(sessionId);
        const messages = await this.repository.getMessages(session.id, 50);
        return {
            sessionId,
            memory: session.memory || {},
            messages,
        };
    }
    async retrieve(message, plan, memory) {
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
        const toursForRanking = rawTours.length ? rawTours : await this.repository.getFeaturedTours(6);
        const tourIds = Array.from(new Set(toursForRanking.map((tour) => Number(tour.id)).filter(Boolean))).slice(0, 6);
        const tourDetails = await this.repository.getTourDetails(tourIds);
        return {
            documents,
            tours: this.recommendation.rank(toursForRanking, plan, memory).slice(0, 6).map((tour) => ({
                ...tour,
                details: tourDetails.find((detail) => detail.id === tour.id),
            })),
            coupons,
            policyFacts: [
                'Use bookings, payments, contacts, and coupons tables as source of truth when data is available.',
                'If cancellation/payment policy is not present in database context, say that staff confirmation is required.',
            ],
        };
    }
    looksLikePromptInjection(message) {
        return /(ignore previous|ignore all|system prompt|developer message|api key|secret|show sql|bypass|jailbreak)/i.test(message);
    }
    getSearchText(message, plan) {
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
        const matchedDestination = knownDestinations.find((item) => item.aliases.some((alias) => normalized.includes(alias)));
        if (matchedDestination)
            return matchedDestination.value;
        if (destination)
            return destination;
        const cleaned = this.normalizeText(planned || message)
            .replace(/\b(chi tiet|thong tin|tu van|goi y|de xuat|tim|kiem|tour|chuyen di|lich trinh|gia|ve|cho toi|cho minh|toi muon|can)\b/g, ' ')
            .replace(/\s+/g, ' ')
            .trim();
        return cleaned || planned || message;
    }
    normalizeText(value) {
        return value
            .normalize('NFD')
            .replace(/[\u0300-\u036f]/g, '')
            .replace(/đ/g, 'd')
            .replace(/Đ/g, 'D')
            .toLowerCase();
    }
};
exports.ChatbotService = ChatbotService;
exports.ChatbotService = ChatbotService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [chatbot_repository_1.ChatbotRepository,
        gemini_travel_service_1.GeminiTravelService,
        recommendation_service_1.RecommendationService])
], ChatbotService);
//# sourceMappingURL=chatbot.service.js.map