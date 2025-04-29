// Nest
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ApiProperty } from '@nestjs/swagger';

// Lib
import { Document, Types } from 'mongoose';

export type DeveloperDocument = Developer & Document;

@Schema({ timestamps: true })
export class Developer {
  // Basic Info
  @ApiProperty({
    description: 'The name of the developer.',
    example: 'ABC Real Estate Ltd.',
  })
  @Prop({ required: true })
  name: string;

  @ApiProperty({
    description: 'A short description of the developer.',
    example:
      'A leading real estate developer specializing in residential and commercial properties.',
  })
  @Prop({ required: true })
  description: string;

  @ApiProperty({
    description: 'Unique reference number for the developer.',
    example: 12345,
  })
  @Prop({ type: Number, required: true, unique: true })
  referenceNumber: number;

  @ApiProperty({
    description: 'The logo of the developer.',
    example: 'https://example.com/logo.png',
  })
  @Prop({ required: true })
  logo: string;

  // Contacts
  @ApiProperty({
    description: 'The contact phone number of the developer.',
    example: '+1234567890',
  })
  @Prop({ required: true })
  phone: string;

  @ApiProperty({
    description: 'The contact email address of the developer.',
    example: 'contact@abcrealestate.com',
  })
  @Prop({ required: true })
  email: string;

  @ApiProperty({
    description: 'The website URL of the developer.',
    example: 'https://www.abcrealestate.com',
  })
  @Prop({ required: true })
  websiteUrl: string;

  // Creator ID (refers to User)
  @ApiProperty({
    description: 'ID of the user who created this developer entry.',
    example: '60f5b4f6c2e5a07f320e7c0d',
  })
  @Prop({ type: Types.ObjectId, ref: 'User', required: true })
  userId: Types.ObjectId;

  // Soft delete
  @ApiProperty({
    description: 'Indicates if the developer is marked as deleted.',
    example: false,
  })
  @Prop({
    type: Boolean,
    default: false,
    required: true,
  })
  isDeleted: boolean;
}

export const DeveloperSchema = SchemaFactory.createForClass(Developer);
