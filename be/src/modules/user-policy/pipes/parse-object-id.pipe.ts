//NestJS
import { PipeTransform, Injectable, BadRequestException } from '@nestjs/common';

// Lib
import { Types } from 'mongoose';

@Injectable()
export class ParseObjectIdPipe
  implements PipeTransform<string, Types.ObjectId>
{
  transform(value: string): Types.ObjectId {
    const isValid = Types.ObjectId.isValid(value);

    if (!isValid) {
      throw new BadRequestException({
        message: 'failure',
        details: 'Invalid user-policy id',
        messageCode: 9,
      });
    }

    return new Types.ObjectId(value);
  }
}
