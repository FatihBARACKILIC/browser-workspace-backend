import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { PhotographersController } from './photographers.controller';
import { PhotographerRepository } from './photographers.repository';
import { PhotographersService } from './photographers.service';
import {
  Photographer,
  PhotographerSchema,
} from './schemas/photographers.schemas';
import { UnsplashModule } from 'src/modules/unsplash/unsplash.module';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Photographer.name, schema: PhotographerSchema },
    ]),
    UnsplashModule,
  ],
  controllers: [PhotographersController],
  providers: [PhotographersService, PhotographerRepository],
  exports: [PhotographerRepository],
})
export class PhotographersModule {}
