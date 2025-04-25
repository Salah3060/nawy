import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

// Define the Role enum
export enum Role {
  USER = 'user',
  ADMIN = 'admin',
}

export type UserDocument = User & Document;

@Schema({ timestamps: true })
export class User {
  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  username: string;

  @Prop({ required: true })
  password: string;

  @Prop({
    type: String,
    enum: Role,
    default: Role.USER,
    required: true,
  })
  role: Role;

  // Soft delete
  @Prop({
    type: Boolean,
    default: false,
    required: true,
  })
  isDeleted: boolean;
}

export const UserSchema = SchemaFactory.createForClass(User);
