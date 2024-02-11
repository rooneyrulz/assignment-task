import { ForbiddenException, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';

import { PrismaService } from 'src/prisma/prisma.service';
import { AuthDTO } from './dto';
import * as bcrypt from 'bcrypt';
import { Tokens } from './types';

@Injectable()
export class AuthService {
  constructor(
    private prisma: PrismaService,
    private jwtService: JwtService,
    private config: ConfigService,
  ) {}

  async signUp(dto: AuthDTO): Promise<Tokens> {
    const user = await this.prisma.user.findUnique({
      where: {
        email: dto.email,
      },
    });

    if (user) throw new ForbiddenException('Email already in use');

    const hash = await this.hashData(dto.password);

    const newUser = await this.prisma.user.create({
      data: {
        name: dto.name,
        email: dto.email,
        hash,
        hashedRT: null,
      },
    });

    const tokens = await this.getTokens(
      newUser.id,
      newUser.name,
      newUser.email,
    );
    await this.updateRTHash(newUser.id, tokens.refreshToken);

    return tokens;
  }

  async signIn(dto: AuthDTO): Promise<Tokens> {
    const user = await this.prisma.user.findUnique({
      where: {
        email: dto.email,
      },
    });

    if (!user) throw new ForbiddenException('Access denied');

    const passwordMatches = await bcrypt.compare(dto.password, user.hash);

    if (!passwordMatches) throw new ForbiddenException('Access denied');

    const tokens = await this.getTokens(user.id, user.name, user.email);
    await this.updateRTHash(user.id, tokens.refreshToken);

    return tokens;
  }

  async logout(userId: string) {
    await this.prisma.user.updateMany({
      where: {
        id: userId,
        hashedRT: {
          not: null,
        },
      },
      data: {
        hashedRT: null,
      },
    });
  }

  async refresh(userId: string, refreshToken: string): Promise<Tokens> {
    const user = await this.prisma.user.findUnique({
      where: {
        id: userId,
      },
    });

    if (!user || !user.hashedRT) throw new ForbiddenException('Access denied');

    const tokenMatches = await bcrypt.compare(refreshToken, user.hashedRT);

    if (!tokenMatches) throw new ForbiddenException('Access denied');

    const tokens = await this.getTokens(user.id, user.name, user.email);
    await this.updateRTHash(user.id, tokens.refreshToken);

    return tokens;
  }

  // Utility functions

  async hashData(password: string) {
    const salt = await bcrypt.genSalt();
    return await bcrypt.hash(password, salt);
  }

  async getTokens(userId: string, name: string, email: string) {
    const [accessToken, refreshToken] = await Promise.all([
      this.jwtService.signAsync(
        {
          sub: userId,
          name,
          email,
        },
        {
          expiresIn: 60 * 15,
          secret: this.config.get('ACCESS_TOKEN_SECRET'),
        },
      ),
      this.jwtService.signAsync(
        {
          sub: userId,
          email,
        },
        {
          expiresIn: 60 * 60 * 24 * 7,
          secret: this.config.get('REFRESH_TOKEN_SECRET'),
        },
      ),
    ]);

    return {
      accessToken,
      refreshToken,
    };
  }

  async updateRTHash(id: string, token: string) {
    const hashedRT = await this.hashData(token);
    await this.prisma.user.update({
      where: {
        id,
      },
      data: {
        hashedRT,
      },
    });
  }
}
