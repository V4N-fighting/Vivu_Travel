import { Pool } from 'pg';
export declare class UsersRepository {
    private readonly pool;
    constructor(pool: Pool);
    findByEmail(email: string): Promise<any>;
    findById(id: number): Promise<any>;
    create(data: any): Promise<any>;
    updateProfile(id: number, data: any): Promise<any>;
    updatePassword(id: number, hashedPassword: string): Promise<void>;
}
