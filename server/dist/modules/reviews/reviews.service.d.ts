import { ReviewsRepository } from './reviews.repository';
export declare class ReviewsService {
    private readonly reviewsRepository;
    constructor(reviewsRepository: ReviewsRepository);
    findByTour(tourId: number): Promise<any[]>;
    findLatest(limit?: number): Promise<any[]>;
    create(reviewData: any): Promise<any>;
}
