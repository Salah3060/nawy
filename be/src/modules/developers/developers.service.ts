import { CreateDeveloperDto } from './dtos/createDeveloperDto';
import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Developer, DeveloperDocument } from './schemas/developer.schema';
import { DeveloperFilter } from './developers.interface';

@Injectable()
export class DevelopersService {
  constructor(
    @InjectModel(Developer.name)
    private developerModel: Model<DeveloperDocument>,
  ) {}

  // Create Developer
  async create(
    userId: string,
    developer: CreateDeveloperDto,
    logo: string,
  ): Promise<DeveloperDocument> {
    // Check if the reference number already exists
    const existingDevelopers = await this.getMany({
      referenceNumber: developer.referenceNumber,
      isDeleted: false,
    });
    if (existingDevelopers.length > 0) {
      throw new BadRequestException('Developer already exists'); // Return BadRequestException if username exists
    }

    const newDeveloper = new this.developerModel({
      userId,
      logo,
      ...developer,
    });
    const savedDeveloper = await newDeveloper.save();
    return savedDeveloper;
  }

  // Get Many Users
  async getMany(
    filter: DeveloperFilter,
    selections: string = '',
  ): Promise<DeveloperDocument[]> {
    return await this.developerModel.find(filter).select(selections).exec();
  }

  // Get One User
  async getOne(
    filter: DeveloperFilter,
    selections: string = '',
  ): Promise<DeveloperDocument> {
    const developer = await this.developerModel
      .findOne(filter)
      .select(selections)
      .exec();

    if (!developer) {
      throw new NotFoundException('User not found');
    }
    return developer;
  }
}
