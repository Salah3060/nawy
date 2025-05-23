//NestJS
import {
  Injectable,
  NotFoundException,
  BadRequestException,
  Type,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';

// Lib
import { Model, Types } from 'mongoose';

// Schemas
import { UserPolicy, UserPolicyDocument } from './entities/user-policy.entity';

// DTOs
import { CreateUserPolicyDto } from './dtos/create-user-policy.dto';
import { UpdateUserPolicyDto } from './dtos/update-user-policy.dto';

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

  async createUserPolicy(
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

  async updateUserPolicy(
    id: Types.ObjectId,
    companyId: Types.ObjectId,
    updateUserPolicyDto: UpdateUserPolicyDto,
  ): Promise<UserPolicyDocument> {
    const userPolicy = await this.updateOne(
      {
        _id: id,
        companyId: companyId,
        isDeleted: false,
      },
      updateUserPolicyDto,
    );
    if (!userPolicy) {
      throw new NotFoundException({
        message: 'failure',
        details: 'User Policy not found',
        messageCode: 10,
      });
    }
    return userPolicy;
  }
  async getUserPolicy(
    role: string,
    companyId: Types.ObjectId,
  ): Promise<UserPolicyDocument> {
    const userPolicy = await this.getOne({
      role: role,
      companyId: companyId,
      isDeleted: false,
    });
    return userPolicy || ({} as UserPolicyDocument);
  }
  async getCompanyUserPolicies(
    companyId: Types.ObjectId,
    page: number = 1,
    limit: number = 50,
  ): Promise<UserPolicyDocument[]> {
    const userPolicies = await this.getMany(
      {
        companyId: companyId,
        isDeleted: false,
      },
      '',
      page,
      limit,
    );
    return userPolicies || [];
  }

  /// just for working with db without any other logic

  async deleteUserPolicy(
    id: Types.ObjectId,
    companyId: Types.ObjectId,
  ): Promise<UserPolicyDocument> {
    const userPolicy = await this.updateOne(
      { _id: id, companyId, isDeleted: false },
      { isDeleted: true },
    );
    if (!userPolicy) {
      throw new NotFoundException({
        message: 'failure',
        details: 'User Policy not found',
        messageCode: 10,
      });
    }
    return userPolicy;
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
  async getMany(
    filter: UserPolicyInterface,
    selections: string = '',
    page: number = 1,
    limit: number = 50,
  ): Promise<UserPolicyDocument[]> {
    const userPolicies = await this.userPolicyModel
      .find(filter)
      .select(selections)
      .skip((page - 1) * limit)
      .limit(limit)
      .exec();
    return userPolicies;
  }
  async updateOne(
    filterObject: UserPolicyInterface,
    updateUserPolicyDto: UpdateUserPolicyDto,
  ): Promise<UserPolicyDocument | null> {
    const userPolicy = await this.userPolicyModel
      .findOneAndUpdate(filterObject, updateUserPolicyDto, {
        new: true,
        runValidators: true,
      })
      .exec();
    return userPolicy;
  }
}
