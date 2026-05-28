export type ChatRole = 'user' | 'assistant' | 'system';

export interface ChatMessage {
  role: ChatRole;
  content: string;
}

export interface ChatRequest {
  message: string;
  sessionId?: string;
  userId?: number;
  locale?: string;
}

export interface UserMemory {
  budget?: number;
  currency?: string;
  destinations?: string[];
  activities?: string[];
  travelStyle?: string;
  people?: number;
  durationDays?: number;
  language?: string;
  summary?: string;
}

export interface TravelDocument {
  id: number;
  sourceType: string;
  sourceId: number;
  title: string;
  content: string;
  metadata: Record<string, any>;
  similarity?: number;
}

export interface TourCandidate {
  id: number;
  name: string;
  description?: string;
  country_name?: string;
  tour_type_name?: string;
  duration?: string;
  price_adult?: number;
  price_child?: number;
  max_people?: number;
  hotel_star?: number;
  meeting_point?: string;
  booking_deadline_days?: number;
  avg_rating?: number;
  review_count?: number;
  booking_count?: number;
  next_departure?: string;
  upcoming_departure_count?: number;
  activities?: string[];
  transportations?: string[];
  score?: number;
  details?: any;
}

export interface RetrievalContext {
  documents: TravelDocument[];
  tours: TourCandidate[];
  coupons: any[];
  policyFacts: string[];
}

export interface IntentPlan {
  language: string;
  intent: string;
  filters: {
    searchText?: string;
    budget?: number;
    people?: number;
    minDays?: number;
    maxDays?: number;
    destination?: string;
    activities?: string[];
    travelStyle?: string;
    minRating?: number;
    dateFrom?: string;
    dateTo?: string;
    dateRange?: string;
  };
}
