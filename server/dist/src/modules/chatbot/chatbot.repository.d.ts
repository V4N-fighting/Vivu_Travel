import { Pool } from 'pg';
import { ChatMessage, TourCandidate, TravelDocument, UserMemory } from './chatbot.types';
export declare class ChatbotRepository {
    private readonly pool;
    private readonly logger;
    constructor(pool: Pool);
    ensureRuntimeTables(): Promise<void>;
    getSchemaContext(): Promise<{
        tables: {
            [k: string]: string[];
        };
        relationships: any[];
    }>;
    getOrCreateSession(sessionKey: string, userId?: number): Promise<any>;
    getMessages(sessionId: string, limit?: number): Promise<ChatMessage[]>;
    saveMessage(sessionId: string, role: string, content: string, metadata?: any): Promise<void>;
    updateMemory(sessionId: string, memory: UserMemory, summary?: string): Promise<void>;
    logAnalytics(data: {
        sessionId?: string;
        userMessage: string;
        detectedIntent?: string;
        retrievedCount?: number;
        latencyMs?: number;
        error?: string;
    }): Promise<void>;
    searchToursBySql(filters: any, limit?: number): Promise<TourCandidate[]>;
    fullTextSearch(message: string, limit?: number): Promise<TravelDocument[]>;
    getTourDetails(tourIds: number[]): Promise<any[]>;
    getActiveCoupons(): Promise<any[]>;
    getFeaturedTours(limit?: number): Promise<TourCandidate[]>;
}
