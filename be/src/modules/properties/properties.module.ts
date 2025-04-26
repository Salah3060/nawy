import { Module } from '@nestjs/common';
import { PropertiesController } from './properties.controller';
import { PropertiesService } from './properties.service';
import { DevelopersModule } from '../developers/developers.module';
import { CompoundsModule } from '../compounds/compounds.module';
import { MongooseModule } from '@nestjs/mongoose';
import { Property, PropertySchema } from './schemas/properties.schema';
import { CloudinaryModule } from '../../common/cloudinary/cloudinary.module';

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
