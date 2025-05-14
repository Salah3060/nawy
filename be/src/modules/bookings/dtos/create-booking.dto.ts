import {
  IsString,
  IsNotEmpty,
  IsMongoId,
  IsDate,
  IsNumber,
  IsOptional,
  IsDateString,
} from 'class-validator';
import { Type } from 'class-transformer';

import { ApiProperty } from '@nestjs/swagger';

export class CreateBookingDto {
  @IsMongoId({ message: 'propertyId must be a valid Mongo ID' })
  @IsNotEmpty()
  @ApiProperty({
    description: 'The ID of the property being booked',
    example: '60d5ec49f1b2c8b8f8e4e4e4',
  })
  @ApiProperty({
    description: 'The ID of the property being booked',
    example: '60d5ec49f1b2c8b8f8e4e4e4',
  })
  propertyId: string;

  @IsNumber()
  @IsNotEmpty()
  @Type(() => Number)
  @ApiProperty({
    description: 'The number of days for the booking',
    example: 5,
  })
  price: number;
}
