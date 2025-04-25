import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

export type CompoundDocument = Compound & Document;

@Schema({ timestamps: true })
export class Compound {
  // Basic Info
  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  description: string;

  @Prop({ type: Number, required: true, unique: true })
  referenceNumber: number;

  // Location
  @Prop({ required: true })
  city: string;

  @Prop({ required: true })
  province: string;

  @Prop({ required: true })
  country: string;

  @Prop({ type: Number, required: true })
  latitude: number;

  @Prop({ type: Number, required: true })
  longitude: number;

  // Project Details
  @Prop({ type: Number, required: true })
  totalUnits: number;

  @Prop({ type: [String], required: true })
  propertyTypes: string[];

  @Prop({ required: true })
  status: string;

  @Prop({ type: Date, required: true })
  deliveryDate: Date;

  @Prop({ type: [String], required: true })
  images: string[];

  @Prop({ type: String, required: true })
  masterPlan: string;

  // Developer ID (refers to User)
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

export const CompoundSchema = SchemaFactory.createForClass(Compound);
