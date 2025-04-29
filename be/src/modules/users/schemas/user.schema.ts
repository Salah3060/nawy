// Nest
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ApiProperty } from '@nestjs/swagger';

// Lib
import { Document } from 'mongoose';

// Define the Role enum
export enum Role {
  USER = 'user',
  ADMIN = 'admin',
}

export type UserDocument = User & Document;

@Schema({ timestamps: true })
export class User {
  @ApiProperty({
    description: 'User full name',
    example: 'Ahmed Ayman',
  })
  @Prop({ required: true })
  name: string;

  @ApiProperty({
    description: 'User username',
    example: 'a.ayman@nawy.com',
  })
  @Prop({ required: true })
  username: string;

  @Prop({ required: true })
  password: string;

  @ApiProperty({
    description: 'Role of the user (admin or user)',
    enum: Role,
    default: Role.USER,
    example: 'admin',
  })
  @Prop({
    type: String,
    enum: Role,
    default: Role.USER,
    required: true,
  })
  role: Role;

  @ApiProperty({
    description: 'Soft delete flag',
    type: Boolean,
    default: false,
    example: false,
  })
  @Prop({
    type: Boolean,
    default: false,
    required: true,
  })
  isDeleted: boolean;
}
export const UserSchema = SchemaFactory.createForClass(User);
