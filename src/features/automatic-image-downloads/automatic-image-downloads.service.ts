import { Injectable, Logger } from '@nestjs/common';
import { UnsplashService } from 'src/modules/unsplash/unsplash.service';
import { unsplashConstant } from 'src/shared/constants';
import { ImageRepository } from '../images/images.repository';
import { IImage } from '../images/interfaces/images.interface';
import { PhotographerRepository } from '../photographers/photographers.repository';

@Injectable()
export class AutomaticImageDownloadsService {
  private logger = new Logger(AutomaticImageDownloadsService.name);

  private static counter = 0;

  constructor(
    private readonly unsplash: UnsplashService,
    private readonly imageRepository: ImageRepository,
    private readonly photographerRepository: PhotographerRepository,
  ) {}

  // @Cron(CronExpression.EVERY_30_MINUTES)
  // TODO: Change time
  // @Cron('0 */2 * * * *')
  // @Cron('15 * * * * *')
  async automaticDownload() {
    const images = await this.getImagesFromUnsplash();
    const idList = await this.separateImageAndPhotographer(images as IImage[]);
    return idList;
  }

  async getImagesFromUnsplash() {
    const url = unsplashConstant.photosUrl(
      AutomaticImageDownloadsService.counter,
    );
    this.logger.verbose(url);
    const response = await this.unsplash.fetchFromUnsplash(url);
    const images = response satisfies IImage[];
    return images;
  }

  async separateImageAndPhotographer(images: IImage[]) {
    const idList: { photographerId: string; imageId: string }[] = [];
    for (let i = 0; i < images.length; i++) {
      const { _id: pId } = await this.photographerRepository.create(
        // FIXME: remove type converting
        (images[i] as any).user,
      );
      const photographerId = pId.toString();
      const { _id: iId } = await this.imageRepository.create({
        ...images[i],
        photographer: photographerId,
      });
      const imageId = iId.toString();
      idList[i] = { photographerId, imageId };
    }
    const allImages = await this.imageRepository.findAll();
    const allPhotographers = await this.photographerRepository.findAll();
    this.logger.log(
      `${1 + AutomaticImageDownloadsService.counter++} times fetched: images: ${allImages.length} photographers: ${allPhotographers.length}`,
    );
    return idList;
  }
}
