import { Pool } from 'pg';
export declare class BannersRepository {
    private readonly pool;
    constructor(pool: Pool);
    findAll(): Promise<any[]>;
    findActive(): Promise<any[]>;
    create(data: any): Promise<any>;
    update(id: number, data: any): Promise<any>;
    delete(id: number): Promise<{
        message: string;
    }>;
}
