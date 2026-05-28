import { ChatbotService } from './chatbot.service';
export declare class ChatbotController {
    private readonly chatbotService;
    constructor(chatbotService: ChatbotService);
    ask(message: string): Promise<{
        answer: string;
        suggestions: string[];
        data?: undefined;
    } | {
        answer: string;
        data: {
            tours: {
                id: number;
                name: string;
                country: string;
                duration: string;
                priceAdult: number;
            }[];
        };
        suggestions: string[];
    }>;
}
