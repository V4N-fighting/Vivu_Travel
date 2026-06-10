"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthService = void 0;
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const jwt_1 = require("@nestjs/jwt");
const bcrypt = require("bcryptjs");
const google_auth_library_1 = require("google-auth-library");
const users_repository_1 = require("../users/users.repository");
let AuthService = class AuthService {
    constructor(usersRepository, jwtService, configService) {
        this.usersRepository = usersRepository;
        this.jwtService = jwtService;
        this.configService = configService;
        this.googleClient = new google_auth_library_1.OAuth2Client(this.configService.get('google.clientId'));
    }
    async register(registerDto) {
        const existingUser = await this.usersRepository.findByEmail(registerDto.email);
        if (existingUser) {
            throw new common_1.ConflictException('Email already exists');
        }
        const hashedPassword = await bcrypt.hash(registerDto.password, 10);
        const user = await this.usersRepository.create({
            ...registerDto,
            password: hashedPassword,
        });
        return {
            message: 'User registered successfully',
            user,
        };
    }
    async login(loginDto) {
        const user = await this.usersRepository.findByEmail(loginDto.email);
        if (!user) {
            throw new common_1.UnauthorizedException('Invalid email or password');
        }
        const isPasswordValid = await bcrypt.compare(loginDto.password, user.password);
        if (!isPasswordValid) {
            throw new common_1.UnauthorizedException('Invalid email or password');
        }
        return this.buildAuthResponse(user);
    }
    async googleLogin(googleDto) {
        const clientId = this.configService.get('google.clientId');
        if (!clientId) {
            throw new common_1.UnauthorizedException('Google login is not configured');
        }
        const ticket = await this.googleClient.verifyIdToken({
            idToken: googleDto.credential,
            audience: clientId,
        });
        const payload = ticket.getPayload();
        if (!payload?.email || !payload.email_verified) {
            throw new common_1.UnauthorizedException('Google account email is not verified');
        }
        let user = await this.usersRepository.findByEmail(payload.email);
        if (!user) {
            const fallbackName = payload.name || payload.email.split('@')[0];
            const [firstName, ...lastNameParts] = fallbackName.trim().split(/\s+/);
            const hashedPassword = await bcrypt.hash(`google:${payload.sub}:${Date.now()}`, 10);
            user = await this.usersRepository.create({
                firstName: payload.given_name || firstName || 'Google',
                lastName: payload.family_name || lastNameParts.join(' ') || 'User',
                email: payload.email,
                password: hashedPassword,
                avatar: payload.picture?.slice(0, 255),
                role: 'customer',
            });
        }
        return this.buildAuthResponse(user);
    }
    async buildAuthResponse(user) {
        const payload = { sub: user.id, email: user.email, role: user.role };
        const access_token = await this.jwtService.signAsync(payload);
        return {
            access_token,
            user: {
                id: user.id,
                firstName: user.first_name,
                lastName: user.last_name,
                email: user.email,
                avatar: user.avatar,
                role: user.role,
            },
        };
    }
};
exports.AuthService = AuthService;
exports.AuthService = AuthService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [users_repository_1.UsersRepository,
        jwt_1.JwtService,
        config_1.ConfigService])
], AuthService);
//# sourceMappingURL=auth.service.js.map