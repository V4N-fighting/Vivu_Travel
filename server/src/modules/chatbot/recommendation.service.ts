import { Injectable } from '@nestjs/common';
import { IntentPlan, TourCandidate, UserMemory } from './chatbot.types';

@Injectable()
export class RecommendationService {
  rank(tours: TourCandidate[], plan: IntentPlan, memory: UserMemory): TourCandidate[] {
    return tours
      .map((tour) => ({
        ...tour,
        score: this.scoreTour(tour, plan, memory),
      }))
      .sort((a, b) => (b.score || 0) - (a.score || 0));
  }

  private scoreTour(tour: TourCandidate, plan: IntentPlan, memory: UserMemory) {
    let score = 0;
    const filters = plan.filters || {};
    const activities = new Set([...(filters.activities || []), ...(memory.activities || [])].map((item) => item.toLowerCase()));
    const searchText = this.normalizeText(filters.searchText || filters.destination || '');
    const searchableTourText = this.normalizeText([
      tour.name,
      tour.description,
      tour.country_name,
      tour.tour_type_name,
      ...(tour.activities || []),
      ...(tour.transportations || []),
    ].filter(Boolean).join(' '));

    score += Math.min(Number(tour.avg_rating || 0), 5) * 12;
    score += Math.min(Number(tour.review_count || 0), 20) * 1.5;
    score += Math.min(Number(tour.booking_count || 0), 50) * 1.2;

    if (searchText) {
      if (this.normalizeText(tour.name || '').includes(searchText)) score += 80;
      if (searchableTourText.includes(searchText)) score += 36;
      searchText.split(/\s+/).filter((word) => word.length > 2).forEach((word) => {
        if (searchableTourText.includes(word)) score += 8;
      });
    }

    if (filters.budget && tour.price_adult) {
      score += tour.price_adult <= filters.budget ? 24 : -18;
      score += Math.max(0, 10 - Math.abs(tour.price_adult - filters.budget) / Math.max(filters.budget, 1) * 10);
    }

    if (filters.destination && tour.country_name?.toLowerCase().includes(filters.destination.toLowerCase())) {
      score += 18;
    }

    const tourActivityText = (tour.activities || []).join(' ').toLowerCase();
    activities.forEach((activity) => {
      if (tourActivityText.includes(activity) || tour.description?.toLowerCase().includes(activity)) score += 12;
    });

    if (memory.people && tour.max_people && tour.max_people >= memory.people) score += 8;
    if (tour.next_departure) score += 6;

    return Number(score.toFixed(2));
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
