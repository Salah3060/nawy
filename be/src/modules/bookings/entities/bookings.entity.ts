import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import { ApiProperty } from '@nestjs/swagger';
import { IsOptional } from 'class-validator';
import { BookingStatus } from '../enums/booking-status.enum';

export type BookingDocument = Booking & Document;

@Schema({ timestamps: true })
export class Booking {
  @ApiProperty({
    description: 'ID of the user who made the booking',
    example: '60f5b4f6c2e5a07f320e7c0d',
  })
  @Prop({ type: Types.ObjectId, ref: 'User', required: true })
  userId: Types.ObjectId;

  @ApiProperty({
    description: 'ID of the property being booked',
    example: '60f5b4f6c2e5a07f320e7c0d',
  })
  @Prop({ type: Types.ObjectId, ref: 'Property', required: true })
  propertyId: Types.ObjectId;

  @ApiProperty({
    description: 'Start date of the booking',
    example: '2023-07-15T00:00:00.000Z',
  })
  @ApiProperty({
    description: 'Total price of the booking',
    example: 5000,
  })
  @Prop({ type: Number, required: true })
  price: number;

  @ApiProperty({
    description: 'ID of the payment method used',
    example: '60d5ec49f1b2c8b8f8e4e4e4',
  })
  @Prop({
    type: Types.ObjectId,
    ref: 'Payment',
    required: false,
    default: null,
  })
  paymentId: Types.ObjectId;

  @ApiProperty({
    description: 'Status of the booking',
    example: 'pending',
    enum: BookingStatus,
  })
  @Prop({
    type: String,
    enum: BookingStatus,
    default: BookingStatus.PENDING,
    required: true,
  })
  bookingStatus: BookingStatus;

  @ApiProperty({
    description: 'Indicates if the booking is marked as deleted',
    example: false,
  })
  @Prop({
    type: Boolean,
    default: false,
    required: true,
  })
  isDeleted: boolean;
}

export const BookingSchema = SchemaFactory.createForClass(Booking);
