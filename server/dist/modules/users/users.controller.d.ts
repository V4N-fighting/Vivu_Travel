import { UsersService } from './users.service';
export declare class UsersController {
    private readonly usersService;
    constructor(usersService: UsersService);
    findById(id: string): Promise<any>;
    update(id: string, userData: any): Promise<any>;
}
