import { UsersRepository } from './users.repository';
export declare class UsersService {
    private readonly usersRepository;
    constructor(usersRepository: UsersRepository);
    findById(id: number): Promise<any>;
    update(id: number, userData: any): Promise<any>;
}
