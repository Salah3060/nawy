// Nest
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

// Modules
import { CloudinaryModule } from '../../common/cloudinary/cloudinary.module';

// Controllers
import { DevelopersController } from './developers.controller';

// Services
import { DevelopersService } from './developers.service';

// Schemas
import { Developer, DeveloperSchema } from './schemas/developers.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Developer.name, schema: DeveloperSchema },
    ]),
    CloudinaryModule,
  ],
  controllers: [DevelopersController],
  providers: [DevelopersService],
  exports: [DevelopersService],
})
export class DevelopersModule {}
