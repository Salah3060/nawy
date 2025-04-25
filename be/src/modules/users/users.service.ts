import {
  BadRequestException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import * as bcrypt from 'bcryptjs';

// Schema
import { User, UserDocument } from './schemas/user.schema';

// Dtos
import { CreateUserDto } from './dtos/createUserDto';

// Interfaces
import { UserFilter } from './users.interface';

@Injectable()
export default class UsersService {
  constructor(
    @InjectModel(User.name)
    private userModel: Model<UserDocument>,
  ) {}

  // Create User
  async create(user: CreateUserDto): Promise<UserDocument> {
    // Check if the username already exists
    const existingUsers = await this.getMany({
      username: user.username,
      isDeleted: false,
    });

    if (existingUsers.length > 0) {
      throw new BadRequestException('Username already exists'); // Return BadRequestException if username exists
    }

    // Hash the password before saving
    const hashedPassword = await bcrypt.hash(user.password, 10);

    const newUser = new this.userModel({
      ...user,
      password: hashedPassword,
    });

    const savedUser = await newUser.save();

    // Exclude password from the saved user before returning
    return savedUser.toObject({
      getters: true,
      transform: (doc, ret) => {
        ret.password = undefined;
        return ret;
      },
    });
  }

  // Get Many Users
  async getMany(
    filter: UserFilter,
    selections: string = '',
  ): Promise<UserDocument[]> {
    return await this.userModel.find(filter).select(selections).exec();
  }

  // Get One User
  async getOne(
    filter: UserFilter,
    selections: string = '',
  ): Promise<UserDocument> {
    const user = await this.userModel.findOne(filter).select(selections).exec();

    if (!user) {
      throw new NotFoundException('User not found');
    }
    return user;
  }
}
