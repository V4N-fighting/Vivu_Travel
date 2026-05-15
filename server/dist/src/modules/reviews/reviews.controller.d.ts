import { ReviewsService } from './reviews.service';
export declare class ReviewsController {
    private readonly reviewsService;
    constructor(reviewsService: ReviewsService);
    findByTour(tourId: string): Promise<any[]>;
    findLatest(limit: string): Promise<any[]>;
    create(req: any, reviewData: any): Promise<any>;
}
