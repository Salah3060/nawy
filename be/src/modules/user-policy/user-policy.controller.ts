//NestJS
import {
  Controller,
  Post,
  Get,
  Body,
  Req,
  UseGuards,
  UseInterceptors,
  Put,
  BadGatewayException,
  Param,
  BadRequestException,
  Delete,
} from '@nestjs/common';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiBody,
  ApiBearerAuth,
  ApiParam,
} from '@nestjs/swagger';

// Lib
import { Types } from 'mongoose';

// Services
import { UserPolicyService } from './user-policy.service';

// DTOs
import { CreateUserPolicyDto } from './dtos/create-user-policy.dto';
import { UpdateUserPolicyDto } from './dtos/update-user-policy.dto';

// Guards
import { RolesGuard } from '../../common/guards/roles.guard';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';

// Interfaces
import { RequestWithUser } from '../../common/interfaces/request-with-user.interface';

// Decorators
import { Roles } from '../../common/decorators/roles.decorator';

//Interceptors
import { UserPolicyInterceptor } from './interceptors/response-transform.interceptor';

//Utils
import { stringToObjectId } from '../../utils/mongodb-object-id.utils';
import { use } from 'passport';

// Pipes
import { ParseObjectIdPipe } from './pipes/parse-object-id.pipe';

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
    return this.userPolicyService.createUserPolicy(
      createUserPolicyDto,
      new Types.ObjectId('682e7b0828949999ab4a3bf0'), // Assuming companyId is in req.user
    );
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('admin') // Only admin can access this
  @Put('update/:userPolicyId')
  @UseInterceptors(UserPolicyInterceptor)
  @ApiOperation({ summary: 'Update an existing user policy' })
  @ApiResponse({
    status: 200,
    description: 'User policy successfully updated.',
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
  @ApiBearerAuth()
  @ApiBody({
    type: CreateUserPolicyDto,
    description: 'The user policy data to update',
  })
  @ApiParam({
    name: 'userPolicyId',
    description: 'The ID of the user policy to update',
    type: String,
  })
  @ApiResponse({
    status: 200,
    description: 'User policy updated successfully',
  })
  async update(
    @Req() req: RequestWithUser,
    @Param('userPolicyId', ParseObjectIdPipe) userPolicyId: Types.ObjectId,
    @Body() createUserPolicyDto: CreateUserPolicyDto,
  ) {
    return this.userPolicyService.updateUserPolicy(
      userPolicyId,
      new Types.ObjectId('6823dde4253b413b4a74581e'), // Assuming companyId is in req.user
      createUserPolicyDto,
    );
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('admin') // Only admin can access this
  @Delete('delete/:userPolicyId')
  @UseInterceptors(UserPolicyInterceptor)
  @ApiOperation({ summary: 'Delete a user policy' })
  @ApiResponse({
    status: 200,
    description: 'User policy successfully deleted.',
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
  @ApiBearerAuth()
  @ApiParam({
    name: 'userPolicyId',
    description: 'The ID of the user policy to delete',
    type: String,
  })
  @ApiResponse({
    status: 200,
    description: 'User policy deleted successfully',
  })
  async delete(
    @Req() req: RequestWithUser,
    @Param('userPolicyId', ParseObjectIdPipe) userPolicyId: Types.ObjectId,
  ) {
    return this.userPolicyService.deleteUserPolicy(
      userPolicyId,
      new Types.ObjectId('6823dde4253b413b4a74581e'), // Assuming companyId is in req.user
    );
  }
  @UseGuards(JwtAuthGuard)
  @Get('get/one/:role')
  @UseInterceptors(UserPolicyInterceptor)
  @ApiOperation({ summary: 'Get a user policy by role' })
  @ApiResponse({
    status: 200,
    description: 'User policy successfully retrieved.',
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
  @ApiBearerAuth()
  @ApiParam({
    name: 'role',
    description: 'The role',
    type: String,
  })
  @ApiResponse({
    status: 200,
    description: 'User policy retrieved successfully',
  })
  async getOne(@Req() req: RequestWithUser, @Param('role') role: string) {
    return this.userPolicyService.getUserPolicy(
      role,
      new Types.ObjectId('6823dde4253b413b4a74581e'), // Assuming companyId is in req.user
    );
  }
  @UseGuards(JwtAuthGuard)
  @Get('get/company')
  @UseInterceptors(UserPolicyInterceptor)
  @ApiOperation({ summary: 'Get all user policies for a company' })
  @ApiResponse({
    status: 200,
    description: 'User policies successfully retrieved.',
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
  @ApiBearerAuth()
  @ApiResponse({
    status: 200,
    description: 'User policies retrieved successfully',
  })
  async getAll(@Req() req: RequestWithUser) {
    return this.userPolicyService.getCompanyUserPolicies(
      new Types.ObjectId('6823dde4253b413b4a74581e'), // Assuming companyId is in req.user
    );
  }
}
