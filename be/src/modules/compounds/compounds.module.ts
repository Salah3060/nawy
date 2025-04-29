// Nest
import { Module } from '@nestjs/common';

// Modules
import { MongooseModule } from '@nestjs/mongoose';
import { CloudinaryModule } from '../../common/cloudinary/cloudinary.module';
import { DevelopersModule } from '../developers/developers.module';

// Controllers
import { CompoundsController } from './compounds.controller';

// Services
import { CompoundsService } from './compounds.service';

// Schemas
import { Compound, CompoundSchema } from './schemas/compounds.schema';

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
  exports: [CompoundsService],
})
export class CompoundsModule {}
