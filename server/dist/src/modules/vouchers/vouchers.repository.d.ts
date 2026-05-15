import { Pool } from 'pg';
export declare class VouchersRepository {
    private readonly pool;
    constructor(pool: Pool);
    findByCode(code: string): Promise<any>;
    incrementUsedCount(id: number): Promise<void>;
}
