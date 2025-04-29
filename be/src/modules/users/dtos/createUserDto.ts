// Nest
import { ApiProperty } from '@nestjs/swagger';

// Lib
import { IsString, IsNotEmpty } from 'class-validator';

export class CreateUserDto {
  @ApiProperty({
    description: 'The name of the user',
    example: 'Ahmed Ayman',
  })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({
    description: 'The username for the user account',
    example: 'a.ayman@nawy.com',
  })
  @IsString()
  @IsNotEmpty()
  username: string;

  @ApiProperty({
    description: 'The password for the user account',
    example: 'securePassword123!',
  })
  @IsString()
  @IsNotEmpty()
  password: string;
}
