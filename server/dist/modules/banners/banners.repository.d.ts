import { Pool } from 'pg';
export declare class BannersRepository {
    private readonly pool;
    constructor(pool: Pool);
    findAll(): Promise<any[]>;
}
