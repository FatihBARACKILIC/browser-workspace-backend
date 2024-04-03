import { Injectable } from '@nestjs/common';
import { UnsplashService } from 'src/modules/unsplash/unsplash.service';
import { unsplashConstant } from 'src/shared/constants';
import { CollectionsRepository } from './collections.repository';
import { CreateCollectionDto } from './dto/create-collection.dto';

@Injectable()
export class CollectionsService {
  constructor(
    private readonly unsplash: UnsplashService,
    private readonly collectionRepository: CollectionsRepository,
  ) {}

  async create({ url }: CreateCollectionDto) {
    const collectionId = url.substring(33).split('/')[0];
    const collection = await this.unsplash.fetchFromUnsplash(
      unsplashConstant.mainUrl(`collections/${collectionId}`),
    );
    const newCollection = await this.collectionRepository.create(collection);
    return newCollection;
  }

  findAll() {
    return this.collectionRepository.findAll();
  }

  findOne(id: string) {
    if (id.length === '660d4b6aae7364c13b60e841'.length)
      return this.collectionRepository.findById(id);
    return this.collectionRepository.findByUnsplashId(id);
  }

  remove(id: string) {
    return this.collectionRepository.remove(id);
  }
}
