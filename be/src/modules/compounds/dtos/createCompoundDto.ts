// Nest
import { ApiProperty } from '@nestjs/swagger';

// Lib
import {
  IsString,
  IsNotEmpty,
  IsNumberString,
  ArrayNotEmpty,
  IsArray,
  IsDateString,
  IsMongoId,
  IsEnum,
} from 'class-validator';
import { Types } from 'mongoose';

// Enums
import { CompoundStatus } from '../compound.enum';
import { PropertyType } from '../../properties/properties.enum';

export class CreateCompoundDto {
  // Basic Info
  @ApiProperty({
    description: 'The name of the compound',
    example: 'Green Valley Residences',
  })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({
    description: 'A detailed description of the compound',
    example:
      'A luxurious residential compound with 2,000 units located in the heart of the city.',
  })
  @IsString()
  @IsNotEmpty()
  description: string;

  @ApiProperty({
    description: 'A unique reference number for the compound',
    example: 12345,
  })
  @IsNumberString()
  @IsNotEmpty()
  referenceNumber: number;

  // Location
  @ApiProperty({
    description: 'The city where the compound is located',
    example: 'Riyadh',
  })
  @IsString()
  @IsNotEmpty()
  city: string;

  @ApiProperty({
    description: 'The province where the compound is located',
    example: 'Riyadh Province',
  })
  @IsString()
  @IsNotEmpty()
  province: string;

  @ApiProperty({
    description: 'The country where the compound is located',
    example: 'Saudi Arabia',
  })
  @IsString()
  @IsNotEmpty()
  country: string;

  @ApiProperty({
    description: 'The latitude of the compound location',
    example: '24.7136',
  })
  @IsNumberString()
  @IsNotEmpty()
  latitude: number;

  @ApiProperty({
    description: 'The longitude of the compound location',
    example: '46.6753',
  })
  @IsNumberString()
  @IsNotEmpty()
  longitude: number;

  // Project Details
  @ApiProperty({
    description: 'The total number of units in the compound',
    example: 2000,
  })
  @IsNumberString()
  @IsNotEmpty()
  totalUnits: number;

  @ApiProperty({
    description: 'List of property types available in the compound',
    enum: PropertyType,
    isArray: true,
    example: ['villa', 'apartment'],
  })
  @IsArray()
  @ArrayNotEmpty()
  @IsString({ each: true })
  @IsEnum(PropertyType, { each: true })
  propertyTypes: PropertyType[];

  @ApiProperty({
    description: 'The status of the compound',
    enum: CompoundStatus,
    example: 'Finished',
  })
  @IsEnum(CompoundStatus)
  status: string;

  @ApiProperty({
    description: 'The expected delivery date for the compound',
    type: String,
    format: 'date-time',
    example: '2025-12-31T00:00:00Z',
  })
  @IsNotEmpty()
  @IsDateString()
  deliveryDate: string;

  @ApiProperty({
    description: 'The developer ID who owns the compound',
    type: String,
    example: '60d5f0d4d1c0b8f8b0f8b0f0',
  })
  @IsNotEmpty()
  @IsMongoId({ message: 'developerId must be a valid Mongo ID' })
  developerId: Types.ObjectId;
}
