// Nest
import { ApiProperty } from '@nestjs/swagger';

// Lib
import { Types } from 'mongoose';
import { IsMongoId } from 'class-validator';

export class GetPropertyDto {
  @ApiProperty({
    description: 'The unique identifier of the property.',
    example: '60d6f719f4c5c8d478fc85b7',
  })
  @IsMongoId()
  id: Types.ObjectId;
}
