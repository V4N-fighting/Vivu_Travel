import { Pool } from 'pg';
export declare class ToursRepository {
    private readonly pool;
    constructor(pool: Pool);
    findAll(filters?: any): Promise<any[]>;
    findOne(id: number): Promise<any>;
    findById(id: number): Promise<any>;
    create(tourData: any): Promise<any>;
}
