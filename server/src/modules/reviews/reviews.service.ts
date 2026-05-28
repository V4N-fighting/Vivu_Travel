import { Injectable } from '@nestjs/common';
import { ReviewsRepository } from './reviews.repository';

@Injectable()
export class ReviewsService {
  constructor(private readonly reviewsRepository: ReviewsRepository) {}

  async findByTour(tourId: number) {
    return this.reviewsRepository.findByTour(tourId);
  }

  async findLatest(limit: number = 5) {
    return this.reviewsRepository.findLatest(limit);
  }

  async create(reviewData: any) {
    return this.reviewsRepository.create(reviewData);
  }
}
