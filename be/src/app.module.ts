import { Module } from '@nestjs/common';
import config from './config';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { UsersModule } from './modules/users/users.module';
import { DevelopersModule } from './modules/developers/developers.module';
import { PropertiesModule } from './modules/properties/properties.module';
import { AuthModule } from './modules/auth/auth.module';
import { CloudinaryModule } from './common/cloudinary/cloudinary.module';
import { CompoundsModule } from './modules/compounds/compounds.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: config, // loads from config/index.ts
    }),
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        uri: configService.get<string>('mongoUri'),
      }),
      inject: [ConfigService],
    }),
    UsersModule,
    DevelopersModule,
    PropertiesModule,
    AuthModule,
    CloudinaryModule,
    CompoundsModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
