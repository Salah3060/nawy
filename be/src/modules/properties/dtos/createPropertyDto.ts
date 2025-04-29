// Nest
import { ApiProperty } from '@nestjs/swagger';

// Lib
import {
  IsString,
  IsNotEmpty,
  IsNumber,
  IsNumberString,
  ArrayNotEmpty,
  IsArray,
  IsDateString,
  IsMongoId,
  IsEnum,
  IsOptional,
} from 'class-validator';
import { Types } from 'mongoose';

// Enums
import {
  FinishingStatus,
  FinishingType,
  PropertyType,
} from '../properties.enum';

export class CreatePropertyDto {
  // Basic Info
  @ApiProperty({
    description: 'The name of the property.',
    example: 'Luxury Apartment',
  })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({
    description: 'Detailed description of the property.',
    example: 'A spacious 3-bedroom apartment with modern amenities.',
  })
  @IsString()
  @IsNotEmpty()
  description: string;

  @ApiProperty({
    description: 'Reference number for the property.',
    example: '123456',
  })
  @IsNumberString()
  @IsNotEmpty()
  referenceNumber: number;

  // Location
  @ApiProperty({
    description: 'The ID of the compound the property belongs to.',
    example: '60d6f719f4c5c8d478fc85b7',
  })
  @IsNotEmpty()
  @IsMongoId({ message: 'compoundId must be a valid Mongo ID' })
  compoundId: Types.ObjectId;

  @ApiProperty({
    description: 'Latitude of the property location.',
    example: '37.7749',
    required: false,
  })
  @IsNumberString()
  @IsOptional()
  latitude?: number;

  @ApiProperty({
    description: 'Longitude of the property location.',
    example: '-122.4194',
    required: false,
  })
  @IsNumberString()
  @IsOptional()
  longitude?: number;

  // Property Details
  @ApiProperty({
    description: 'Type of the property (e.g., apartment, villa).',
    enum: PropertyType,
    example: PropertyType.APARTMENT,
  })
  @IsEnum(PropertyType)
  type: string;

  @ApiProperty({
    description: 'Floor number of the property.',
    example: '3',
  })
  @IsNumberString()
  @IsNotEmpty()
  floorNumber: number;

  @ApiProperty({
    description: 'Total number of floors in the building.',
    example: '10',
  })
  @IsNumberString()
  @IsNotEmpty()
  totalFloors: number;

  @ApiProperty({
    description: 'Width of the property in meters.',
    example: '15',
  })
  @IsNumberString()
  @IsNotEmpty()
  width: number;

  @ApiProperty({
    description: 'Length of the property in meters.',
    example: '20',
  })
  @IsNumberString()
  @IsNotEmpty()
  length: number;

  @ApiProperty({
    description: 'Height of the property in meters.',
    example: '3',
  })
  @IsNumberString()
  @IsNotEmpty()
  height: number;

  @ApiProperty({
    description: 'Total area of the property in square meters.',
    example: '300',
  })
  @IsNumberString()
  @IsNotEmpty()
  area: number;

  @ApiProperty({
    description: 'Number of bedrooms in the property.',
    example: '3',
  })
  @IsNumberString()
  @IsNotEmpty()
  beds: number;

  @ApiProperty({
    description: 'Number of bathrooms in the property.',
    example: '2',
  })
  @IsNumberString()
  @IsNotEmpty()
  baths: number;

  @ApiProperty({
    description: 'Number of parking spaces available for the property.',
    example: '2',
  })
  @IsNumberString()
  @IsNotEmpty()
  parkingSpaces: number;

  @ApiProperty({
    description: 'Finishing status of the property.',
    enum: FinishingStatus,
    example: FinishingStatus.IN_PROGRESS,
  })
  @IsEnum(FinishingStatus)
  finishingStatus: string;

  @ApiProperty({
    description: 'Type of finishing.',
    enum: FinishingType,
    example: FinishingType.SEMI_FINISHED,
  })
  @IsEnum(FinishingType)
  finishingType: string;

  @ApiProperty({
    description: 'Expected delivery date of the property.',
    example: '2025-12-01',
  })
  @IsNotEmpty()
  @IsDateString()
  deliveryDate: string;

  @ApiProperty({
    description: 'Price of the property.',
    example: '500000',
  })
  @IsNumberString()
  @IsNotEmpty()
  price: number;

  @ApiProperty({
    description: 'List of amenities available in the property.',
    example: ['Swimming Pool', 'Gym', 'Garden'],
  })
  @IsArray()
  @ArrayNotEmpty()
  @IsString({ each: true })
  amenities: string[];
}
