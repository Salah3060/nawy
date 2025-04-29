// Nest
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

// Lib
import { Document, Types } from 'mongoose';

// Enums
import {
  FinishingStatus,
  FinishingType,
  PropertyType,
} from '../properties.enum';
import { ApiProperty } from '@nestjs/swagger';

export type PropertyDocument = Property & Document;

@Schema({ timestamps: true })
export class Property {
  // Basic Info
  @ApiProperty({
    description: 'The name of the property.',
    example: 'Luxury Apartment in Downtown',
  })
  @Prop({ required: true })
  name: string;

  @ApiProperty({
    description: 'A detailed description of the property.',
    example: 'A luxurious 3-bedroom apartment in the heart of the city.',
  })
  @Prop({ required: true })
  description: string;

  @ApiProperty({
    description: 'Unique reference number for the property.',
    example: 56789,
  })
  @Prop({ type: Number, required: true, unique: true })
  referenceNumber: number;

  // Location
  @ApiProperty({
    description: 'The compound where the property is located.',
    example: '60f5b4f6c2e5a07f320e7c0d',
  })
  @Prop({ type: Types.ObjectId, ref: 'Compound', required: true })
  compoundId: Types.ObjectId;

  @ApiProperty({
    description: 'Latitude of the property location.',
    example: 25.276987,
  })
  @Prop({ type: Number, required: false })
  latitude: number;

  @ApiProperty({
    description: 'Longitude of the property location.',
    example: 55.296249,
  })
  @Prop({ type: Number, required: false })
  longitude: number;

  // Property Details
  @ApiProperty({
    description: 'Type of the property.',
    enum: PropertyType,
    example: PropertyType.APARTMENT,
  })
  @Prop({
    type: String,
    enum: PropertyType,
    required: true,
  })
  type: PropertyType;

  @ApiProperty({
    description: 'The floor number of the property.',
    example: 5,
  })
  @Prop({ type: Number, required: true })
  floorNumber: number;

  @ApiProperty({
    description: 'Total number of floors in the building.',
    example: 10,
  })
  @Prop({ type: Number, required: true })
  totalFloors: number;

  @ApiProperty({
    description: 'Width of the property in meters.',
    example: 10,
  })
  @Prop({ type: Number, required: true })
  width: number;

  @ApiProperty({
    description: 'Length of the property in meters.',
    example: 15,
  })
  @Prop({ type: Number, required: true })
  length: number;

  @ApiProperty({
    description: 'Height of the property in meters.',
    example: 3,
  })
  @Prop({ type: Number, required: true })
  height: number;

  @ApiProperty({
    description: 'Area of the property in square meters.',
    example: 150,
  })
  @Prop({ type: Number, required: true })
  area: number;

  @ApiProperty({
    description: 'Number of bedrooms in the property.',
    example: 3,
  })
  @Prop({ type: Number, required: true })
  beds: number;

  @ApiProperty({
    description: 'Number of bathrooms in the property.',
    example: 2,
  })
  @Prop({ type: Number, required: true })
  baths: number;

  @ApiProperty({
    description: 'Number of parking spaces available.',
    example: 2,
  })
  @Prop({ type: Number, required: true })
  parkingSpaces: number;

  @ApiProperty({
    description: 'Finishing status of the property.',
    enum: FinishingStatus,
    example: FinishingStatus.FINISHED,
  })
  @Prop({
    type: String,
    enum: FinishingStatus,
    required: true,
  })
  finishingStatus: FinishingStatus;

  @ApiProperty({
    description: 'Finishing type of the property.',
    enum: FinishingType,
    example: FinishingType.FULLY_FINISHED,
  })
  @Prop({
    type: String,
    enum: FinishingType,
    required: true,
  })
  finishingType: FinishingType;

  @ApiProperty({
    description: 'Delivery date of the property.',
    example: '2023-12-31T00:00:00.000Z',
  })
  @Prop({ type: Date, required: true })
  deliveryDate: Date;

  @ApiProperty({
    description: 'Price of the property in the local currency.',
    example: 1000000,
  })
  @Prop({ type: Number, required: true })
  price: number;

  @ApiProperty({
    description: 'List of amenities available with the property.',
    example: ['Gym', 'Swimming Pool', '24/7 Security'],
  })
  @Prop({ type: [String], required: true })
  amenities: string[];

  @ApiProperty({
    description: 'URL of the property floor plan.',
    example: 'https://example.com/floor-plan.png',
  })
  @Prop({ type: String, required: true })
  floorPlan: string;

  @ApiProperty({
    description: 'URLs of images related to the property.',
    example: [
      'https://example.com/property1.jpg',
      'https://example.com/property2.jpg',
    ],
  })
  @Prop({ type: [String], required: true })
  images: string[];

  // Developer ID
  @ApiProperty({
    description: 'ID of the developer that owns the property.',
    example: '60f5b4f6c2e5a07f320e7c0d',
  })
  @Prop({ type: Types.ObjectId, ref: 'Developer', required: true })
  developerId: Types.ObjectId;

  // Creator ID (refers to User)
  @ApiProperty({
    description: 'ID of the user who created the property entry.',
    example: '60f5b4f6c2e5a07f320e7c0d',
  })
  @Prop({ type: Types.ObjectId, ref: 'User', required: true })
  userId: Types.ObjectId;

  // Soft delete
  @ApiProperty({
    description: 'Indicates if the property is marked as deleted.',
    example: false,
  })
  @Prop({
    type: Boolean,
    default: false,
    required: true,
  })
  isDeleted: boolean;
}

export const PropertySchema = SchemaFactory.createForClass(Property);
