// Nest
import { Module } from '@nestjs/common';

// Services
import { CloudinaryService } from './cloudinary.service';

// Config
import { configureCloudinary } from '../../config/cloudinary.config';
import { ConfigService } from '@nestjs/config';

@Module({
  providers: [CloudinaryService],
  exports: [CloudinaryService],
})
export class CloudinaryModule {
  constructor(private configService: ConfigService) {}

  onModuleInit() {
    configureCloudinary(this.configService);
  }
}
