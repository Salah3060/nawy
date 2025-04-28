import { IsOptional, IsString, IsNumber } from 'class-validator';
import { Type } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';

export class GetDevelopersDto {
  @ApiProperty({
    description: 'Selected fields.',
    example: 'name',
    required: false,
  })
  @Type(() => String)
  @IsOptional()
  @IsString()
  selections?: string;

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
    description: 'Flag to return all data.',
    example: false,
    required: false,
  })
  @Type(() => Boolean)
  @IsOptional()
  @IsNumber()
  returnAll?: boolean;
}
