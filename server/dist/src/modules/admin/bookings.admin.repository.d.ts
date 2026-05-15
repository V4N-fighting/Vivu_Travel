import { Pool } from 'pg';
export declare class AdminBookingsRepository {
    private readonly pool;
    constructor(pool: Pool);
    findAllBookings(): Promise<any[]>;
    updateBookingStatus(id: number, status: string): Promise<any>;
}
