import { Pool } from 'pg';
export declare class ContactsRepository {
    private readonly pool;
    constructor(pool: Pool);
    create(contactData: any): Promise<any>;
    findAll(): Promise<any[]>;
}
