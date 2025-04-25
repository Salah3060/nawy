import { Compound, CompoundDocument } from './schemas/compounds.schema';
import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateCompoundrDto } from './dtos/createCompoundDto';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { CompoundFilter } from './compounds.interface';
import { DevelopersService } from '../developers/developers.service';
import { Types } from 'mongoose';

CreateCompoundrDto;
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
    compound: CreateCompoundrDto,
    masterPlan: string,
    images: string[],
  ): Promise<CompoundDocument> {
    // Check if the developer exists
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
      userId,
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
    const developer = await this.compoundModel
      .findOne(filter)
      .select(selections)
      .exec();

    if (!developer) {
      throw new NotFoundException('Compound not found');
    }
    return developer;
  }
}
