// Nest
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

// Lib
import * as bcrypt from 'bcryptjs';

// Services
import UsersService from '../users/users.service';

// Schema
import { User, UserDocument } from '../users/schemas/user.schema';

// Dtos
import { LoginDto } from './dtos/loginDto';

// Interfaces
import { LoginResponse } from './auth.interface';

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly userService: UsersService,
  ) {}

  // Validate user credentials
  async validateUser(loginDto: LoginDto): Promise<UserDocument> {
    const user = await this.userService.getOne({
      username: loginDto.username,
      isDeleted: false,
    });

    if (user && (await bcrypt.compare(loginDto.password, user.password))) {
      return user; // Return user if credentials match
    } else {
      throw new UnauthorizedException('Invalid credentials');
    }
  }

  // Login: Generate and return a JWT
  async login(loginDto: LoginDto): Promise<LoginResponse> {
    const user: UserDocument = await this.validateUser(loginDto);
    const payload = {
      name: user.name,
      username: user.username,
      sub: user._id,
      role: user.role,
    };
    return {
      name: user.name,
      username: user.username,
      role: user.role,
      accessToken: this.jwtService.sign(payload), // Sign and generate JWT
    };
  }
}
