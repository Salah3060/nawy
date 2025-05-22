//NestJS
import { ApiProperty } from '@nestjs/swagger';

// Lib
import {
  IsNotEmpty,
  IsString,
  IsEnum,
  IsArray,
  ArrayUnique,
  ArrayNotEmpty,
} from 'class-validator';

// Enums
import { MenuItems } from '../enums/menu-item.enum';

export class CreateUserPolicyDto {
  @ApiProperty({
    description: 'The role name for this policy',
    example: 'Supervisor',
  })
  @IsString()
  @IsNotEmpty()
  role: string;

  @ApiProperty({
    description: 'List of menu items this role has access to',
    example: ['dashboard', 'users', 'properties'],
    enum: MenuItems,
    isArray: true,
  })
  @IsArray()
  @ArrayUnique()
  @ArrayNotEmpty()
  @IsNotEmpty({ each: true })
  @IsEnum(MenuItems, { each: true })
  menuItems: MenuItems[];
}
