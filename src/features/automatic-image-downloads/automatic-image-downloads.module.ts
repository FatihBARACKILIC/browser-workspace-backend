import { Module } from '@nestjs/common';
import { UnsplashModule } from 'src/modules/unsplash/unsplash.module';
import { ImagesModule } from '../images/images.module';
import { PhotographersModule } from '../photographers/photographers.module';
import { AutomaticImageDownloadsController } from './automatic-image-downloads.controller';
import { AutomaticImageDownloadsService } from './automatic-image-downloads.service';

@Module({
  imports: [UnsplashModule, ImagesModule, PhotographersModule],
  controllers: [AutomaticImageDownloadsController],
  providers: [AutomaticImageDownloadsService],
})
export class AutomaticImageDownloadsModule {}
