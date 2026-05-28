import { ChatbotRepository } from './chatbot.repository';
import { GroqTravelService } from './groq-travel.service';
import { RecommendationService } from './recommendation.service';
import { ChatRequest } from './chatbot.types';
export declare class ChatbotService {
    private readonly repository;
    private readonly ai;
    private readonly recommendation;
    constructor(repository: ChatbotRepository, ai: GroqTravelService, recommendation: RecommendationService);
    ask(request: ChatRequest): Promise<{
        sessionId: string;
        answer: string;
    }>;
    stream(request: ChatRequest): AsyncGenerator<string>;
    getHistory(sessionId: string): Promise<{
        sessionId: string;
        memory: any;
        messages: import("./chatbot.types").ChatMessage[];
    }>;
    private retrieve;
    private looksLikePromptInjection;
    private getSearchText;
    private normalizeText;
}
