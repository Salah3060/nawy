import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import {
  FinishingStatus,
  FinishingType,
  PropertyType,
} from '../properties.enum';

export type PropertyDocument = Property & Document;

@Schema({ timestamps: true })
export class Property {
  // Basic Info
  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  description: string;

  @Prop({ type: Number, required: true, unique: true })
  referenceNumber: number;

  // Location
  @Prop({ type: Types.ObjectId, ref: 'Compound', required: true })
  compoundId: Types.ObjectId;

  @Prop({ type: Number, required: true })
  latitude: number;

  @Prop({ type: Number, required: true })
  longitude: number;

  // Property Details
  @Prop({
    type: String,
    enum: PropertyType,
    required: true,
  })
  type: PropertyType;

  @Prop({ type: Number, required: true })
  floorNumber: number;

  @Prop({ type: Number, required: true })
  totalFloors: number;

  @Prop({ type: Number, required: true })
  width: number;

  @Prop({ type: Number, required: true })
  length: number;

  @Prop({ type: Number, required: true })
  height: number;

  @Prop({ type: Number, required: true })
  area: number;

  @Prop({ type: Number, required: true })
  beds: number;

  @Prop({ type: Number, required: true })
  baths: number;

  @Prop({ type: Number, required: true })
  parkingSpaces: number;

  @Prop({
    type: String,
    enum: FinishingStatus,
    required: true,
  })
  finishingStatus: FinishingStatus;

  @Prop({
    type: String,
    enum: FinishingType,
    required: true,
  })
  finishingType: FinishingType;

  @Prop({ type: Date, required: true })
  deliveryDate: Date;

  @Prop({ type: Number, required: true })
  price: number;

  @Prop({ type: [String], required: true })
  amenities: string[];

  @Prop({ type: String, required: true })
  floorPlan: string;

  @Prop({ type: [String], required: true })
  images: string[];

  // Developer ID
  @Prop({ type: Types.ObjectId, ref: 'Developer', required: true })
  developerId: Types.ObjectId;

  // Creator ID (refers to User)
  @Prop({ type: Types.ObjectId, ref: 'User', required: true })
  userId: Types.ObjectId;

  // Soft delete
  @Prop({
    type: Boolean,
    default: false,
    required: true,
  })
  isDeleted: boolean;
}

export const PropertySchema = SchemaFactory.createForClass(Property);
