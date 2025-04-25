import { Module } from '@nestjs/common';
import { CompoundsService } from './compounds.service';
import { CompoundsController } from './compounds.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { CloudinaryModule } from '../../common/cloudinary/cloudinary.module';
import { Compound, CompoundSchema } from './schemas/compounds.schema';
import { DevelopersModule } from '../developers/developers.module';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Compound.name, schema: CompoundSchema },
    ]),
    CloudinaryModule,
    DevelopersModule,
  ],
  controllers: [CompoundsController],
  providers: [CompoundsService],
})
export class CompoundsModule {}
