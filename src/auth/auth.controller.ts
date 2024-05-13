import {
  BadRequestException,
  Body,
  Controller,
  HttpCode,
  Post,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { RegisterAuthDto } from './dto/register-auth.dto';
import { ApiTags } from '@nestjs/swagger';
import { LoginAuthDto } from './dto/login-auth.dto';
import { RefreshTokenDto } from './dto/refreshToken.dto';

@Controller('auth')
@ApiTags('Auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  async register(@Body() dto: RegisterAuthDto) {
    const oldEmail = await this.authService.findUserByEmail(dto.email);
    if (oldEmail) {
      throw new BadRequestException('Email already exists');
    }
    const oldUserName = await this.authService.findUserByUsername(dto.username);
    if (oldUserName) {
      throw new BadRequestException('Username already exists');
    }
    return this.authService.createUser(dto);
  }

  @HttpCode(200)
  @Post('login')
  async login(@Body() { email, password }: LoginAuthDto) {
    const userEntity = await this.authService.validateUser(email, password);
    return this.authService.login(userEntity);
  }

  @HttpCode(200)
  @Post('refresh')
  async refresh(@Body() refreshToken: RefreshTokenDto) {
    return this.authService.refreshToken(refreshToken.refreshToken);
  }
}
