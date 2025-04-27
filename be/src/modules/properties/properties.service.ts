import { PropertyFilter } from './properties.interface';
import { Property, PropertyDocument } from './schemas/properties.schema';
import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { Model } from 'mongoose';
import { CreatePropertyDto } from './dtos/createPropertyDto';
import { InjectModel } from '@nestjs/mongoose';
import { DevelopersService } from '../developers/developers.service';
import { Types } from 'mongoose';
import { CompoundsService } from '../compounds/compounds.service';

@Injectable()
export class PropertiesService {
  constructor(
    @InjectModel(Property.name)
    private propertyModel: Model<PropertyDocument>,
    private developersService: DevelopersService,
    private compoundsService: CompoundsService,
  ) {}

  // Create Property
  async create(
    userId: string,
    property: CreatePropertyDto,
    floorPlan: string,
    images: string[],
  ): Promise<PropertyDocument> {
    // Check if the developer exists
    property.compoundId = new Types.ObjectId(property.compoundId);

    const existingCompound = await this.compoundsService.getOne({
      _id: property.compoundId,
      isDeleted: false,
    });

    // Check if the reference number already exists
    const existingProperty = await this.getMany({
      referenceNumber: property.referenceNumber,
      isDeleted: false,
    });

    if (existingProperty.length > 0) {
      throw new BadRequestException('Property already exists');
    }

    const newProperty = new this.propertyModel({
      userId,
      floorPlan,
      images,
      developerId: existingCompound.developerId,
      ...property,
    });
    const savedProperty = await newProperty.save();
    return savedProperty;
  }

  // Get Many Properties
  async getMany(
    filter: PropertyFilter,
    selections: string = '',
    page = 1,
    limit = 10,
    populateList: { path: string; select?: string }[] = [],
  ): Promise<PropertyDocument[]> {
    const skip = (page - 1) * limit;

    return await this.propertyModel
      .find(filter)
      .select(selections)
      .skip(skip)
      .limit(limit)
      .populate(populateList)
      .exec();
  }

  // Get One Property
  async getOne(
    filter: PropertyFilter,
    selections: string = '',
  ): Promise<PropertyDocument> {
    const property = await this.propertyModel
      .findOne(filter)
      .select(selections)
      .exec();

    if (!property) {
      throw new NotFoundException('Property not found');
    }
    return property;
  }
}
