//NestJS
import {
  Injectable,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';

// Lib
import { Model, Types } from 'mongoose';

// Schemas
import { UserPolicy, UserPolicyDocument } from './entities/user-policy.entity';

// DTOs
import { CreateUserPolicyDto } from './dtos/create-user-policy.dto';

// Interfaces
import { UserPolicyInterface } from './user-policy.interface';

//Utils
import { stringToObjectId } from '../../utils/mongodb-object-id.utils';

@Injectable()
export class UserPolicyService {
  constructor(
    @InjectModel(UserPolicy.name)
    private readonly userPolicyModel: Model<UserPolicyDocument>,
  ) {}

  async create(
    createUserPolicyDto: CreateUserPolicyDto,
    companyId: Types.ObjectId,
  ): Promise<UserPolicyDocument> {
    // Check if the user policy already exists
    const existingPolicy = await this.getOne({
      role: createUserPolicyDto.role,
      companyId: companyId,
      isDeleted: false,
    });

    if (existingPolicy) {
      throw new BadRequestException({
        message: 'failure',
        details: 'User Policy Exists :(',
        messageCode: 9,
      });
    }

    const newUserPolicy = new this.userPolicyModel({
      ...createUserPolicyDto,
      companyId: companyId,
    });
    return await newUserPolicy.save();
  }

  async getOne(
    filter: UserPolicyInterface,
    selections: string = '',
  ): Promise<UserPolicyDocument | null> {
    const userPolicy = await this.userPolicyModel
      .findOne(filter)
      .select(selections)
      .exec();

    return userPolicy;
  }
}
