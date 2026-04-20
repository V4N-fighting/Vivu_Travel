import { Pool } from 'pg';
export declare class ActivitiesRepository {
    private readonly pool;
    constructor(pool: Pool);
    findAll(): Promise<any[]>;
}
