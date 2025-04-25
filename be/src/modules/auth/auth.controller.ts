import { Controller, Post, Body } from '@nestjs/common';
import { LoginDto } from './dtos/loginDto';
import { User } from '../users/schemas/user.schema';
import { LoginResponse } from './auth.interface';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  async login(@Body() loginDto: LoginDto): Promise<LoginResponse> {
    return this.authService.login(loginDto);
  }
}
