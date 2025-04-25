import {
  IsString,
  IsNotEmpty,
  IsNumber,
  IsNumberString,
  ArrayNotEmpty,
  IsArray,
  IsDateString,
  IsMongoId,
} from 'class-validator';
import { Types } from 'mongoose';

export class CreateCompoundrDto {
  // Basic Info
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsNotEmpty()
  description: string;

  @IsNumberString()
  @IsNotEmpty()
  referenceNumber: number;

  // Location
  @IsString()
  @IsNotEmpty()
  city: string;

  @IsString()
  @IsNotEmpty()
  province: string;

  @IsString()
  @IsNotEmpty()
  country: string;

  @IsNumberString()
  @IsNotEmpty()
  latitude: number;

  @IsNumberString()
  @IsNotEmpty()
  longitude: number;

  // Project Details
  @IsNumberString()
  @IsNotEmpty()
  totalUnits: number;

  @IsArray()
  @ArrayNotEmpty()
  @IsString({ each: true })
  propertyTypes: string[];

  @IsString()
  @IsNotEmpty()
  status: string;

  @IsNotEmpty()
  @IsDateString()
  deliveryDate: string;

  @IsNotEmpty()
  @IsMongoId({ message: 'developerId must be a valid Mongo ID' })
  developerId: Types.ObjectId;
}
