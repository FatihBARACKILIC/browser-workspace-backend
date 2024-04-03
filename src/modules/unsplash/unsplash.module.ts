import { Module } from '@nestjs/common';
import { UnsplashService } from './unsplash.service';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [ConfigModule],
  providers: [UnsplashService],
  exports: [UnsplashService],
})
export class UnsplashModule {}
