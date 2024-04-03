import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { ScheduleModule } from '@nestjs/schedule';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AutomaticImageDownloadsModule } from './features/automatic-image-downloads/automatic-image-downloads.module';
import { ImagesModule } from './features/images/images.module';
import { PhotographersModule } from './features/photographers/photographers.module';
import { envConfig } from './modules/config';
import { MongooseConfigService } from './modules/mongoose-config/mongoose-config.service';
import { UnsplashModule } from './modules/unsplash/unsplash.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [envConfig],
    }),
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      useClass: MongooseConfigService,
    }),
    ScheduleModule.forRoot(),
    ImagesModule,
    AutomaticImageDownloadsModule,
    PhotographersModule,
    UnsplashModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
