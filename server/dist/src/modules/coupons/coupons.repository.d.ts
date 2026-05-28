import { Pool } from 'pg';
export declare class CouponsRepository {
    private readonly pool;
    constructor(pool: Pool);
    findByCode(code: string): Promise<any>;
    incrementUsedCount(id: number): Promise<void>;
    findAll(): Promise<any[]>;
    create(data: any): Promise<any>;
    update(id: number, data: any): Promise<any>;
}
