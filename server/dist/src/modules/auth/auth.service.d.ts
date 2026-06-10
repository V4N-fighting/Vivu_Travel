import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { UsersRepository } from '../users/users.repository';
export declare class AuthService {
    private readonly usersRepository;
    private readonly jwtService;
    private readonly configService;
    private readonly googleClient;
    constructor(usersRepository: UsersRepository, jwtService: JwtService, configService: ConfigService);
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
            avatar: any;
            role: any;
        };
    }>;
    googleLogin(googleDto: any): Promise<{
        access_token: string;
        user: {
            id: any;
            firstName: any;
            lastName: any;
            email: any;
            avatar: any;
            role: any;
        };
    }>;
    private buildAuthResponse;
}
