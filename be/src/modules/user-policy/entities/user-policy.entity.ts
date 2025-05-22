// Nest
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ApiProperty } from '@nestjs/swagger';

// Lib
import { Document } from 'mongoose';
import { Types } from 'mongoose';

// Enums
import { MenuItems } from '../enums/menu-item.enum';

export type UserPolicyDocument = UserPolicy & Document;

@Schema({ timestamps: true })
export class UserPolicy {
  @ApiProperty({
    description: 'The role name for this policy',
    example: 'Supervisor',
  })
  @Prop({ required: true, type: String })
  role: string;

  @ApiProperty({
    description: 'List of menu items this role has access to',
    example: ['dashboard', 'users', 'properties'],
    enum: MenuItems,
    isArray: true,
  })
  @Prop({
    type: [String],
    enum: Object.values(MenuItems),
    required: true,
  })
  menuItems: MenuItems[];

  @ApiProperty({
    description: 'ID of the company this policy belongs to',
    example: '60101e5718db573714e53942',
  })
  @Prop({ type: Types.ObjectId, ref: 'Company', required: true })
  companyId: Types.ObjectId;

  @ApiProperty({
    description: 'Indicates if the policy is marked as deleted',
    example: false,
  })
  @Prop({
    type: Boolean,
    default: false,
  })
  isDeleted: boolean;
}

export const UserPolicySchema = SchemaFactory.createForClass(UserPolicy);
