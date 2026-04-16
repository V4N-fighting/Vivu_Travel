import { AuthService } from './auth.service';
export declare class AuthController {
    private readonly authService;
    constructor(authService: AuthService);
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
