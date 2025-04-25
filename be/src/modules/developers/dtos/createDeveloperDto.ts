import {
  IsString,
  IsNotEmpty,
  IsNumber,
  IsNumberString,
} from 'class-validator';

export class CreateDeveloperDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsNotEmpty()
  description: string;

  @IsNumberString()
  @IsNotEmpty()
  referenceNumber: number;

  @IsString()
  @IsNotEmpty()
  phone: string;

  @IsString()
  @IsNotEmpty()
  email: string;

  @IsString()
  @IsNotEmpty()
  websiteUrl: string;
}
