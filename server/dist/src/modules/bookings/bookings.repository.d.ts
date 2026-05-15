import { Pool } from 'pg';
export declare class BookingsRepository {
    private readonly pool;
    constructor(pool: Pool);
    create(bookingData: any): Promise<any>;
    findByUser(userId: number): Promise<any[]>;
    findById(id: number): Promise<any>;
}
