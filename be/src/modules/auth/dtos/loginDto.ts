// Nest
import { IsString, IsNotEmpty } from 'class-validator';

// Lib
import { ApiProperty } from '@nestjs/swagger';

export class LoginDto {
  @ApiProperty({
    description: 'The username of the user',
    example: 'johndoe123',
  })
  @IsString()
  @IsNotEmpty()
  username: string;

  @ApiProperty({
    description: 'The password of the user',
    example: 'securePassword123!',
  })
  @IsString()
  @IsNotEmpty()
  password: string;
}
