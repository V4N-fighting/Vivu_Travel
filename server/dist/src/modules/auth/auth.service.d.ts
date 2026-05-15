import { JwtService } from '@nestjs/jwt';
import { UsersRepository } from '../users/users.repository';
export declare class AuthService {
    private readonly usersRepository;
    private readonly jwtService;
    constructor(usersRepository: UsersRepository, jwtService: JwtService);
    register(registerDto: any): Promise<{
        message: string;
        user: any;
    }>;
    login(loginDto: any): Promise<{
        access_token: string;
        user: {
            id: any;
            firstName: any;
            lastName: any;
            email: any;
            role: any;
        };
    }>;
}
