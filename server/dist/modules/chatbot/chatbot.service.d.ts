import { Pool } from 'pg';
export declare class ChatbotService {
    private readonly pool;
    constructor(pool: Pool);
    ask(rawMessage: string): Promise<{
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
    private searchTours;
    private getFeaturedTours;
    private searchCountries;
    private searchBlogs;
    private searchCoupons;
    private composeAnswer;
    private detectIntent;
    private isTourSuggestionRequest;
    private extractTerms;
    private buildSuggestions;
    private defaultSuggestions;
    private formatMoney;
    private formatCoupon;
    private shorten;
}
