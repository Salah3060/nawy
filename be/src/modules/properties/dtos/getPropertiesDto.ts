import { IsOptional, IsString, IsNumber, IsIn } from 'class-validator';
import { Type } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';

export class GetPropertiesDto {
  @ApiProperty({
    description: 'The page number for pagination.',
    example: 1,
    required: false,
  })
  @Type(() => Number)
  @IsOptional()
  @IsNumber()
  page?: number;

  @ApiProperty({
    description: 'The number of items per page for pagination.',
    example: 10,
    required: false,
  })
  @Type(() => Number)
  @IsOptional()
  @IsNumber()
  limit?: number;

  @ApiProperty({
    description: 'The property type.',
    example: 'Appartment',
    required: false,
  })
  @Type(() => String)
  @IsOptional()
  @IsString()
  type?: string;

  @ApiProperty({
    description: 'The number of beds (1, 2, 3, 4, 5+).',
    example: 4,
    required: false,
    enum: [1, 2, 3, 4, 5],
  })
  @Type(() => Number)
  @IsOptional()
  @IsIn([1, 2, 3, 4, 5])
  beds?: number;

  @ApiProperty({
    description: 'The number of baths (1, 2, 3, 4, 5+).',
    example: 2,
    required: false,
    enum: [1, 2, 3, 4, 5],
  })
  @Type(() => Number)
  @IsOptional()
  @IsIn([1, 2, 3, 4, 5])
  baths?: number;

  @ApiProperty({
    description: 'The min price of property.',
    example: 50000,
    required: false,
  })
  @Type(() => Number)
  @IsOptional()
  @IsNumber()
  priceMin?: number;

  @ApiProperty({
    description: 'The max price of the property.',
    example: 10120000,
    required: false,
  })
  @Type(() => Number)
  @IsOptional()
  @IsNumber()
  priceMax?: number;

  @ApiProperty({
    description: 'The property developer.',
    example: 'Emaar',
    required: false,
  })
  @Type(() => String)
  @IsOptional()
  @IsString()
  developer?: string;
}
