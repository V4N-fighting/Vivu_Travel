import { Pool } from 'pg';
export declare class UsersRepository {
    private readonly pool;
    constructor(pool: Pool);
    findByEmail(email: string): Promise<any>;
    findById(id: number): Promise<any>;
    create(userData: any): Promise<any>;
    update(id: number, userData: any): Promise<any>;
    updatePassword(id: number, hashedPassword: string): Promise<void>;
}
