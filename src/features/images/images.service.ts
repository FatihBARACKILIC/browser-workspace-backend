import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { UnsplashService } from 'src/modules/unsplash/unsplash.service';
import { regexConstant, unsplashConstant } from 'src/shared/constants';
import { PhotographerRepository } from '../photographers/photographers.repository';
import { CreateImageDto } from './dto/create-image.dto';
import { ImageRepository } from './images.repository';
import { IImage } from './interfaces/images.interface';

@Injectable()
export class ImagesService {
  constructor(
    private readonly unsplash: UnsplashService,
    private readonly imageRepository: ImageRepository,
    private readonly photographerRepository: PhotographerRepository,
  ) {}

  async create(createImageDto: CreateImageDto) {
    const imagePage = await fetch(createImageDto.url);
    if (!imagePage.ok) {
      throw new BadRequestException(imagePage.statusText);
    }
    const sourceCode = await imagePage.text();
    const [id] = sourceCode.matchAll(regexConstant.unsplashIdPattern);
    if (!id.length) return new InternalServerErrorException();
    const cleanedId = id[0].split('/')[1];
    if (!createImageDto.url.includes(cleanedId)) {
      return new InternalServerErrorException();
    }
    const url = unsplashConstant.photoWithId(cleanedId);
    const response = await this.unsplash.fetchFromUnsplash(url);
    const image = response satisfies IImage;
    const { _id: photographerId } = await this.photographerRepository.create(
      (image as any).user,
    );
    const createdImage = await this.imageRepository.create({
      ...image,
      photographer: photographerId.toString(),
    });
    return createdImage;
  }

  findAll() {
    // TODO: only for admins (maybe)
    return `This action returns all images`;
  }

  findOne(id: string) {
    return this.imageRepository.findById(id);
  }

  async update(id: string) {
    const image = await this.imageRepository.findById(id);

    const url = unsplashConstant.photoWithId(image.id);
    const newImage = await this.unsplash.fetchFromUnsplash(url);
    return await this.imageRepository.update(id, newImage);
  }

  remove(id: string) {
    return this.imageRepository.remove(id);
  }
}
