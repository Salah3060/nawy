// Nest
import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';

// Lib
import { Model } from 'mongoose';
import { Types } from 'mongoose';

// Services
import { DevelopersService } from '../developers/developers.service';

// Schemas
import { Compound, CompoundDocument } from './schemas/compounds.schema';

// Dtos
import { CreateCompoundDto } from './dtos/createCompoundDto';

// Interfaces
import { CompoundFilter } from './compounds.interface';

CreateCompoundDto;
@Injectable()
export class CompoundsService {
  constructor(
    @InjectModel(Compound.name)
    private compoundModel: Model<CompoundDocument>,
    private developersService: DevelopersService,
  ) {}

  // Create Compound
  async create(
    userId: string,
    compound: CreateCompoundDto,
    masterPlan: string,
    images: string[],
  ): Promise<CompoundDocument> {
    // Check if the developer exists
    const userObjectId = new Types.ObjectId(userId);
    compound.developerId = new Types.ObjectId(compound.developerId);
    const existingDevelopers = await this.developersService.getOne({
      _id: compound.developerId,
      isDeleted: false,
    });

    // Check if the reference number already exists
    const existingCompounds = await this.getMany({
      referenceNumber: compound.referenceNumber,
      isDeleted: false,
    });

    if (existingCompounds.length > 0) {
      throw new BadRequestException('Compound already exists');
    }

    const newCompound = new this.compoundModel({
      userId: userObjectId,
      masterPlan,
      images,
      ...compound,
    });
    const savedCompound = await newCompound.save();
    return savedCompound;
  }

  // Get Many Compounds
  async getMany(
    filter: CompoundFilter,
    selections: string = '',
  ): Promise<CompoundDocument[]> {
    return await this.compoundModel.find(filter).select(selections).exec();
  }

  // Get One Compound
  async getOne(
    filter: CompoundFilter,
    selections: string = '',
  ): Promise<CompoundDocument> {
    const compound = await this.compoundModel
      .findOne(filter)
      .select(selections)
      .exec();

    if (!compound) {
      throw new NotFoundException('Compound not found');
    }
    return compound;
  }
}
