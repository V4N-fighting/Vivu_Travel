import { Pool } from 'pg';
export declare class CountriesRepository {
    private readonly pool;
    constructor(pool: Pool);
    findAll(): Promise<any[]>;
    findById(id: number): Promise<any>;
    create(data: any): Promise<any>;
    update(id: number, data: any): Promise<any>;
    delete(id: number): Promise<{
        success: boolean;
    }>;
}
