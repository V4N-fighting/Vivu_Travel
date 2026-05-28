import { Pool } from 'pg';
export declare class ExportService {
    private readonly pool;
    constructor(pool: Pool);
    exportTravelersToCsv(bookingId: number): Promise<string>;
}
