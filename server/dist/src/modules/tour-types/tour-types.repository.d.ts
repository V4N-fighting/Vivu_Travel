import { Pool } from 'pg';
export declare class TourTypesRepository {
    private readonly pool;
    constructor(pool: Pool);
    findAll(): Promise<any[]>;
}
