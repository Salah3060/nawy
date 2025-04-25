import { Module } from '@nestjs/common';
import { CloudinaryService } from './cloudinary.service';
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
