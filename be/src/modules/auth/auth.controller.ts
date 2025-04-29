// Nest
import { Controller, Post, Body, Get, Req, UseGuards } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiBody, ApiResponse } from '@nestjs/swagger';

// Services
import { AuthService } from './auth.service';

// Guard
import { JwtAuthGuard } from './guards/jwt-auth.guard';

// Dtos
import { LoginDto } from './dtos/loginDto';

// Interfaces
import { LoginResponse } from './auth.interface';
import { RequestWithUser } from '../../common/interfaces/request-with-user.interface';

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
        name: 'Ahmed Ayman',
        username: 'a.ayman@nawy.com',
      },
    },
  })
  @ApiResponse({ status: 401, description: 'Invalid credentials' })
  async login(@Body() loginDto: LoginDto): Promise<LoginResponse> {
    return this.authService.login(loginDto);
  }

  @Post('validate-token')
  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: 'Validate token.' })
  @ApiResponse({
    status: 200,
    description: 'Successful login',
    schema: {
      example: {
        name: 'Ahmed Ayman',
        username: 'a.ayman@nawy.com',
      },
    },
  })
  @ApiResponse({ status: 401, description: 'Invalid token' })
  async validateToken(@Req() req: RequestWithUser): Promise<LoginResponse> {
    return { name: req.user.name, username: req.user.username };
  }
}
