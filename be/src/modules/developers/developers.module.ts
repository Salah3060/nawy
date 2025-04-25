import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { DevelopersController } from './developers.controller';
import { DevelopersService } from './developers.service';
import { Developer, DeveloperSchema } from './schemas/developer.schema';
import { CloudinaryModule } from '../../common/cloudinary/cloudinary.module';

CloudinaryModule;
@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Developer.name, schema: DeveloperSchema },
    ]),
    CloudinaryModule,
  ],
  controllers: [DevelopersController],
  providers: [DevelopersService],
})
export class DevelopersModule {}
