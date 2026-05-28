import { ConfigService } from '@nestjs/config';
import { ChatMessage, IntentPlan, RetrievalContext, UserMemory } from './chatbot.types';
export declare class GroqTravelService {
    private readonly configService;
    private readonly logger;
    private readonly apiKey?;
    private readonly modelName;
    private readonly apiUrl;
    constructor(configService: ConfigService);
    hasClient(): boolean;
    plan(message: string, memory: UserMemory, schemaContext: any): Promise<IntentPlan>;
    streamAnswer(params: {
        message: string;
        history: ChatMessage[];
        memory: UserMemory;
        context: RetrievalContext;
        schemaContext: any;
        locale?: string;
    }): AsyncGenerator<string>;
    summarizeMemory(history: ChatMessage[], previous: UserMemory): Promise<UserMemory>;
    private complete;
    private streamCompletion;
    private buildAnswerPrompt;
    private fallbackAnswer;
    private localPlan;
    private extractDestination;
    private cleanSearchText;
    private isVietnamese;
    private normalizeText;
}
