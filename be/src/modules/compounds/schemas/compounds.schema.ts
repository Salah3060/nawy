// Nest
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

// Lib
import { Document, Types } from 'mongoose';

// Enums
import { CompoundStatus } from '../compound.enum';
import { PropertyType } from '../../properties/properties.enum';
import { ApiProperty } from '@nestjs/swagger';

export type CompoundDocument = Compound & Document;

@Schema({ timestamps: true })
export class Compound {
  // Basic Info
  @ApiProperty({
    example: 'Green Meadows',
    description: 'The name of the compound.',
  })
  @Prop({ required: true })
  name: string;

  @ApiProperty({
    example:
      'A luxury compound located in the heart of the city with all amenities.',
    description: 'Description of the compound.',
  })
  @Prop({ required: true })
  description: string;

  @ApiProperty({
    example: 123456,
    description: 'Unique reference number for the compound.',
  })
  @Prop({ type: Number, required: true, unique: true })
  referenceNumber: number;

  // Location
  @ApiProperty({
    example: 'Riyadh',
    description: 'The city where the compound is located.',
  })
  @Prop({ required: true })
  city: string;

  @ApiProperty({
    example: 'Riyadh Province',
    description: 'The province where the compound is located.',
  })
  @Prop({ required: true })
  province: string;

  @ApiProperty({
    example: 'Saudi Arabia',
    description: 'The country where the compound is located.',
  })
  @Prop({ required: true })
  country: string;

  @ApiProperty({
    example: 24.7136,
    description: 'Latitude of the compound location.',
  })
  @Prop({ type: Number, required: true })
  latitude: number;

  @ApiProperty({
    example: 46.6753,
    description: 'Longitude of the compound location.',
  })
  @Prop({ type: Number, required: true })
  longitude: number;

  // Project Details
  @ApiProperty({
    example: 150,
    description: 'Total number of units in the compound.',
  })
  @Prop({ type: Number, required: true })
  totalUnits: number;

  @ApiProperty({
    example: ['Apartment', 'Villa'],
    description: 'Array of property types available in the compound.',
  })
  @Prop({ type: [String], required: true, enum: PropertyType })
  propertyTypes: PropertyType[];

  @ApiProperty({
    example: CompoundStatus.FINISHED,
    description: 'Current status of the compound.',
  })
  @Prop({
    type: String,
    enum: CompoundStatus,
    required: true,
  })
  status: CompoundStatus;

  @ApiProperty({
    example: '2025-12-31',
    description: 'Expected delivery date of the compound.',
  })
  @Prop({ type: Date, required: true })
  deliveryDate: Date;

  @ApiProperty({
    example: ['image1.jpg', 'image2.jpg'],
    description: 'List of images related to the compound.',
  })
  @Prop({ type: [String], required: true })
  images: string[];

  @ApiProperty({
    example: 'masterplan-url.jpg',
    description: 'URL to the master plan image of the compound.',
  })
  @Prop({ type: String, required: true })
  masterPlan: string;

  // Developer ID
  @ApiProperty({
    example: '60d0fe4f5311236168a109ca',
    description:
      'Developer ID (reference to the developer who created the compound).',
  })
  @Prop({ type: Types.ObjectId, ref: 'Developer', required: true })
  developerId: Types.ObjectId;

  // Creator ID (refers to User)
  @ApiProperty({
    example: '60d0fe4f5311236168a109cb',
    description: 'Creator ID (reference to the user who created the compound).',
  })
  @Prop({ type: Types.ObjectId, ref: 'User', required: true })
  userId: Types.ObjectId;

  // Soft delete
  @ApiProperty({
    example: false,
    description: 'Indicates if the compound is deleted (soft delete).',
  })
  @Prop({
    type: Boolean,
    default: false,
    required: true,
  })
  isDeleted: boolean;
}

export const CompoundSchema = SchemaFactory.createForClass(Compound);
