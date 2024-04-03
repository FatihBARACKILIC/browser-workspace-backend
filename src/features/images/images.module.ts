import { Module } from '@nestjs/common';
import { ImagesService } from './images.service';
import { ImagesController } from './images.controller';
import { ImageRepository } from './images.repository';
import { MongooseModule } from '@nestjs/mongoose';
import { Image, ImageSchema } from './schemas/images.schema';
import { UnsplashModule } from 'src/modules/unsplash/unsplash.module';
import { PhotographersModule } from '../photographers/photographers.module';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Image.name, schema: ImageSchema }]),
    UnsplashModule,
    PhotographersModule,
  ],
  controllers: [ImagesController],
  providers: [ImagesService, ImageRepository],
  exports: [ImageRepository],
})
export class ImagesModule {}
