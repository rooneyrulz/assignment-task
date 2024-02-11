import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Post,
  Req,
  UseGuards,
  Ip,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { SkipThrottle } from '@nestjs/throttler';
import { Request } from 'express';

import { AuthService } from './auth.service';
import { AuthDTO } from './dto';
import { Tokens } from './types';
import { LoggerService } from 'src/logger/logger.service';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}
  private readonly logger = new LoggerService(AuthController.name);

  @Post('sign-up')
  @HttpCode(HttpStatus.CREATED)
  signUp(@Ip() ip: string, @Body() dto: AuthDTO): Promise<Tokens> {
    this.logger.log(`Request for sign-up\t${ip}`, AuthController.name);
    return this.authService.signUp(dto);
  }

  @Post('sign-in')
  @HttpCode(HttpStatus.OK)
  signIn(@Ip() ip: string, @Body() dto: AuthDTO): Promise<Tokens> {
    this.logger.log(`Request for sign-in\t${ip}`, AuthController.name);
    return this.authService.signIn(dto);
  }

  @SkipThrottle()
  @UseGuards(AuthGuard('jwt'))
  @Post('logout')
  @HttpCode(HttpStatus.OK)
  logout(@Req() req: Request): Promise<void> {
    const user = req.user;
    return this.authService.logout(user['sub']);
  }

  @SkipThrottle()
  @UseGuards(AuthGuard('jwt-refresh'))
  @Post('refresh')
  @HttpCode(HttpStatus.OK)
  refresh(@Req() req: Request): Promise<Tokens> {
    const user = req.user;
    return this.authService.refresh(user['sub'], user['refreshToken']);
  }
}
