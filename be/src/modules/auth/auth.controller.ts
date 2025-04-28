import { Controller, Post, Body } from '@nestjs/common';
import { LoginDto } from './dtos/loginDto';
import { LoginResponse } from './auth.interface';
import { AuthService } from './auth.service';
import { ApiTags, ApiOperation, ApiBody, ApiResponse } from '@nestjs/swagger';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  @ApiOperation({
    summary: 'User login',
    description: 'Authenticate user and return JWT token.',
  })
  @ApiBody({ type: LoginDto })
  @ApiResponse({
    status: 200,
    description: 'Successful login',
    schema: {
      example: {
        accessToken: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...',
        user: {
          _id: '60d0fe4f5311236168a109ca',
          name: 'Ahmed Ayman',
          username: 'a.ayman@nawy.com',
        },
      },
    },
  })
  @ApiResponse({ status: 401, description: 'Invalid credentials' })
  async login(@Body() loginDto: LoginDto): Promise<LoginResponse> {
    return this.authService.login(loginDto);
  }
}
