import { Pool } from 'pg';
export declare class ActivitiesRepository {
    private readonly pool;
    constructor(pool: Pool);
    findAll(): Promise<any[]>;
    create(data: any): Promise<any>;
    update(id: number, data: any): Promise<any>;
    delete(id: number): Promise<{
        message: string;
    }>;
}
