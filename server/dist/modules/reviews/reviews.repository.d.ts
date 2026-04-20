import { Pool } from 'pg';
export declare class ReviewsRepository {
    private readonly pool;
    constructor(pool: Pool);
    findByTour(tourId: number): Promise<any[]>;
    findLatest(limit?: number): Promise<any[]>;
    create(reviewData: any): Promise<any>;
}
