import { IsString, IsNotEmpty, IsNumberString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateDeveloperDto {
  @ApiProperty({
    description: 'The name of the developer',
    example: 'Elite Developments',
  })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({
    description: 'A brief description of the developer',
    example:
      'A leading real estate developer specializing in residential and commercial projects.',
  })
  @IsString()
  @IsNotEmpty()
  description: string;

  @ApiProperty({
    description: 'A unique reference number for the developer',
    example: '987654',
  })
  @IsNumberString()
  @IsNotEmpty()
  referenceNumber: number;

  @ApiProperty({
    description: 'The phone number of the developer',
    example: '+966500000000',
  })
  @IsString()
  @IsNotEmpty()
  phone: string;

  @ApiProperty({
    description: 'The email address of the developer',
    example: 'contact@elitedevs.com',
  })
  @IsString()
  @IsNotEmpty()
  email: string;

  @ApiProperty({
    description: 'The website URL of the developer',
    example: 'https://www.elitedevs.com',
  })
  @IsString()
  @IsNotEmpty()
  websiteUrl: string;
}
