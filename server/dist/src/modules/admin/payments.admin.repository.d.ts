import { Pool } from 'pg';
export declare class AdminPaymentsRepository {
    private readonly pool;
    constructor(pool: Pool);
    findAll(): Promise<any[]>;
    findByBookingId(bookingId: number): Promise<any[]>;
    create(data: {
        bookingId: number;
        amount: number;
        method: string;
        status?: string;
        transactionId?: string;
    }): Promise<any>;
    updateStatus(id: number, status: string, transactionId?: string): Promise<any>;
    updateMethod(id: number, method: string): Promise<any>;
    getStats(): Promise<any>;
}
