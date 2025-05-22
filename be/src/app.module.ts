// Nest
import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';

// Modules
import { UsersModule } from './modules/users/users.module';
import { DevelopersModule } from './modules/developers/developers.module';
import { PropertiesModule } from './modules/properties/properties.module';
import { AuthModule } from './modules/auth/auth.module';
import { CloudinaryModule } from './common/cloudinary/cloudinary.module';
import { CompoundsModule } from './modules/compounds/compounds.module';

// Middlewares
import { LoggerMiddleware } from './common/middlewares/logger.middleware';
import { BookingsModule } from './modules/bookings/bookings.module';
import { UserPolicyModule } from './modules/user-policy/user-policy.module';

// Config
import config from './config';

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
    BookingsModule,
    UserPolicyModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggerMiddleware).forRoutes('*'); // Applies to all routes
  }
}
