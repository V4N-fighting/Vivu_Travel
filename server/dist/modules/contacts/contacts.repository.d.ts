import { Pool } from 'pg';
export declare class ContactsRepository {
    private readonly pool;
    constructor(pool: Pool);
    create(data: any): Promise<any>;
    findAll(): Promise<any[]>;
    updateReadStatus(id: number, isRead: boolean): Promise<any>;
    delete(id: number): Promise<{
        success: boolean;
    }>;
}
