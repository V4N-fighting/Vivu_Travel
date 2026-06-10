import { Injectable, UnauthorizedException, ConflictException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcryptjs';
import { OAuth2Client } from 'google-auth-library';
import { UsersRepository } from '../users/users.repository';

@Injectable()
export class AuthService {
  private readonly googleClient: OAuth2Client;

  constructor(
    private readonly usersRepository: UsersRepository,
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
  ) {
    this.googleClient = new OAuth2Client(this.configService.get<string>('google.clientId'));
  }

  async register(registerDto: any) {
    const existingUser = await this.usersRepository.findByEmail(registerDto.email);
    if (existingUser) {
      throw new ConflictException('Email already exists');
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

  async login(loginDto: any) {
    const user = await this.usersRepository.findByEmail(loginDto.email);
    if (!user) {
      throw new UnauthorizedException('Invalid email or password');
    }

    const isPasswordValid = await bcrypt.compare(loginDto.password, user.password);
    if (!isPasswordValid) {
      throw new UnauthorizedException('Invalid email or password');
    }

    return this.buildAuthResponse(user);
  }

  async googleLogin(googleDto: any) {
    const clientId = this.configService.get<string>('google.clientId');
    if (!clientId) {
      throw new UnauthorizedException('Google login is not configured');
    }

    const ticket = await this.googleClient.verifyIdToken({
      idToken: googleDto.credential,
      audience: clientId,
    });

    const payload = ticket.getPayload();
    if (!payload?.email || !payload.email_verified) {
      throw new UnauthorizedException('Google account email is not verified');
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

  private async buildAuthResponse(user: any) {
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
}
