import { Pool } from 'pg';
export declare class AdminRepository {
    private readonly pool;
    constructor(pool: Pool);
    getPool(): Pool;
    getDashboardStats(): Promise<{
        revenue: number;
        bookings: number;
        tours: number;
        users: number;
        recentBookings: any[];
        popularTours: any[];
        revenueByMonth: any[];
        statusCounts: any[];
    }>;
}
