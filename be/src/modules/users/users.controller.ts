import { Controller, Post, Body, UseGuards } from '@nestjs/common';
import { User } from './schemas/user.schema';
import UsersService from './users.service';
import { CreateUserDto } from './dtos/createUserDto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../../common/guards/roles.guard';
import { Roles } from '../../common/decorators/roles.decorator';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('admin') // Only admin can access this
  @Post('create')
  async create(@Body() user: CreateUserDto): Promise<User> {
    return this.usersService.create(user);
  }
}
