//NestJs
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

// Controllers
import { UserPolicyController } from './user-policy.controller';

// Services
import { UserPolicyService } from './user-policy.service';

// Schemas
import { UserPolicy, UserPolicySchema } from './entities/user-policy.entity';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: UserPolicy.name, schema: UserPolicySchema },
    ]),
  ],
  controllers: [UserPolicyController],
  providers: [UserPolicyService],
})
export class UserPolicyModule {}
