import { Response } from 'express';
import { ChatbotService } from './chatbot.service';
import { ChatRequest } from './chatbot.types';
export declare class ChatbotController {
    private readonly chatbotService;
    constructor(chatbotService: ChatbotService);
    ask(body: ChatRequest): Promise<{
        sessionId: string;
        answer: string;
    }>;
    stream(body: ChatRequest, response: Response): Promise<void>;
    history(sessionId: string): Promise<{
        sessionId: string;
        memory: any;
        messages: import("./chatbot.types").ChatMessage[];
    }>;
}
