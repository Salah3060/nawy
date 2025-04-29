// Nest
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

// Modules
import { DevelopersModule } from '../developers/developers.module';
import { CompoundsModule } from '../compounds/compounds.module';
import { CloudinaryModule } from '../../common/cloudinary/cloudinary.module';

// Controllers
import { PropertiesController } from './properties.controller';

// Services
import { PropertiesService } from './properties.service';

// Schemas
import { Property, PropertySchema } from './schemas/properties.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Property.name, schema: PropertySchema },
    ]),
    CloudinaryModule,
    DevelopersModule,
    CompoundsModule,
  ],
  controllers: [PropertiesController],
  providers: [PropertiesService],
})
export class PropertiesModule {}
