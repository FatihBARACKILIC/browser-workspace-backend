import { HttpException, Injectable, Logger } from '@nestjs/common';
import { UnsplashService } from 'src/modules/unsplash/unsplash.service';
import { unsplashConstant } from 'src/shared/constants';
import { ImageRepository } from '../images/images.repository';
import { IImage } from '../images/interfaces/images.interface';
import { PhotographerRepository } from '../photographers/photographers.repository';
import { CollectionsRepository } from '../collections/collections.repository';
import { Cron, CronExpression } from '@nestjs/schedule';

@Injectable()
export class AutomaticImageDownloadsService {
  private logger = new Logger(AutomaticImageDownloadsService.name);

  private static automaticDownloadPageCount = 0;

  constructor(
    private readonly unsplash: UnsplashService,
    private readonly imageRepository: ImageRepository,
    private readonly photographerRepository: PhotographerRepository,
    private readonly collectionRepository: CollectionsRepository,
  ) {}

  // @Cron(CronExpression.EVERY_30_MINUTES)
  // TODO: Change time
  // @Cron('0 */2 * * * *')
  async automaticDownload() {
    const images = await this.getImagesFromUnsplash();
    const idList = await this.separateImageAndPhotographer(images as IImage[]);
    return idList;
  }

  async getImagesFromUnsplash() {
    const url = unsplashConstant.photosUrl(
      AutomaticImageDownloadsService.automaticDownloadPageCount,
    );
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
    // this.logger.fatal(
    //   `${1 + AutomaticImageDownloadsService.automaticDownloadPageCount++} times fetched: images: ${allImages.length} photographers: ${allPhotographers.length}`,
    // );
    this.logger.fatal(
      `images: ${allImages.length} photographers: ${allPhotographers.length}`,
    );
    return idList;
  }

  // TODO: Change time
  @Cron(CronExpression.EVERY_MINUTE)
  async automaticDownloadCollections() {
    try {
      const collection = await this.collectionRepository.findOldest();
      await this.downloadCollectionById(collection.id, collection.total_photos);
      await this.collectionRepository.remove(collection._id.toString());
      return collection.title;
    } catch (error) {
      if (!(error instanceof HttpException) || error.getStatus() !== 404) {
        throw error;
      }
    }
  }

  async downloadCollectionById(id: string, imageCount: number) {
    let downloadedPhotos = 0;
    let pageCount = 1;
    const collectionInterval = setInterval(async () => {
      const images = await this.unsplash.fetchFromUnsplash(
        unsplashConstant.mainUrl(`collections/${id}/photos?page=${pageCount}`),
      );
      const result = await this.separateImageAndPhotographer(images);
      if (
        result.length === 10 ||
        (images.length > 0 && images.length === result.length)
      ) {
        downloadedPhotos += 10;
        pageCount++;
      }
      if (imageCount === downloadedPhotos) clearInterval(collectionInterval);
    }, 1000 * 15);
  }
}
