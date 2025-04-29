// Nest
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiBody,
  ApiBearerAuth,
} from '@nestjs/swagger';
import { Controller, Post, Body, UseGuards } from '@nestjs/common';

// Lib

// Services
import UsersService from './users.service';

// Guard
import { RolesGuard } from '../../common/guards/roles.guard';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';

// Decorators
import { Roles } from '../../common/decorators/roles.decorator';

// Schemas
import { User } from './schemas/user.schema';

// Dtos
import { CreateUserDto } from './dtos/createUserDto';

@ApiTags('users')
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('admin') // Only admin can access this
  @Post('create')
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Create a new user' })
  @ApiBody({ type: CreateUserDto })
  @ApiResponse({
    status: 201,
    description: 'User successfully created.',
    type: User,
  })
  @ApiResponse({
    status: 400,
    description: 'Bad request (e.g., validation errors).',
  })
  @ApiResponse({
    status: 401,
    description: 'Unauthorized (admin role required).',
  })
  @ApiResponse({
    status: 403,
    description: 'Forbidden (insufficient permissions).',
  })
  async create(@Body() user: CreateUserDto): Promise<User> {
    return this.usersService.create(user);
  }
}
