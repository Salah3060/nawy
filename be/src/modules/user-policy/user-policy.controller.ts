//NestJS
import {
  Controller,
  Post,
  Get,
  Body,
  Req,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiBody,
  ApiBearerAuth,
} from '@nestjs/swagger';

// Lib
import { Types } from 'mongoose';

// Services
import { UserPolicyService } from './user-policy.service';

// DTOs
import { CreateUserPolicyDto } from './dtos/create-user-policy.dto';

// Guards
import { RolesGuard } from '../../common/guards/roles.guard';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';

// Interfaces
import { RequestWithUser } from '../../common/interfaces/request-with-user.interface';

// Decorators
import { Roles } from '../../common/decorators/roles.decorator';

//Interceptors
import { UserPolicyInterceptor } from './interceptors/response-transform.interceptor';

@ApiTags('user-policy')
@Controller('user-policy')
export class UserPolicyController {
  constructor(private readonly userPolicyService: UserPolicyService) {}

  @Get()
  get() {
    return 'hi from user-policy';
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('admin') // Only admin can access this
  @Post('create')
  @UseInterceptors(UserPolicyInterceptor)
  @ApiOperation({ summary: 'Create a new user policy' })
  @ApiResponse({
    status: 201,
    description: 'User policy successfully created.',
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
  async create(
    @Req() req: RequestWithUser,
    @Body() createUserPolicyDto: CreateUserPolicyDto,
  ) {
    return this.userPolicyService.create(
      createUserPolicyDto,
      new Types.ObjectId('682e7b0828949999ab4a3bf0'), // Assuming companyId is in req.user
    );
  }
}
