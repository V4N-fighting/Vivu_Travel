import { Pool } from 'pg';
export declare class CountriesRepository {
    private readonly pool;
    constructor(pool: Pool);
    findAll(): Promise<any[]>;
}
