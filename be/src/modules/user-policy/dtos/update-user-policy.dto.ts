//NestJS
import { ApiProperty, PartialType } from '@nestjs/swagger';

// DTOs
import { CreateUserPolicyDto } from './create-user-policy.dto';

export class UpdateUserPolicyDto extends PartialType(CreateUserPolicyDto) {
  isDeleted?: boolean;
}
