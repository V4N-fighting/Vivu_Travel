import { Pool } from 'pg';
export declare class AdminUsersRepository {
    private readonly pool;
    constructor(pool: Pool);
    findAllUsers(): Promise<any[]>;
    toggleUserStatus(id: number, isActive: boolean): Promise<any>;
}
