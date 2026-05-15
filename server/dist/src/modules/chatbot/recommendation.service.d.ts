import { IntentPlan, TourCandidate, UserMemory } from './chatbot.types';
export declare class RecommendationService {
    rank(tours: TourCandidate[], plan: IntentPlan, memory: UserMemory): TourCandidate[];
    private scoreTour;
    private normalizeText;
}
