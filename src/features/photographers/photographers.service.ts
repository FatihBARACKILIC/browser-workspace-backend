import { Injectable } from '@nestjs/common';
import { CreatePhotographerDto } from './dto/create-photographer.dto';
import { UnsplashService } from 'src/modules/unsplash/unsplash.service';
import { unsplashConstant } from 'src/shared/constants';
import { PhotographerRepository } from './photographers.repository';

@Injectable()
export class PhotographersService {
  constructor(
    private readonly unsplash: UnsplashService,
    private readonly photographerRepository: PhotographerRepository,
  ) {}

  async create(createPhotographerDto: CreatePhotographerDto) {
    const username = createPhotographerDto.url.split('@')[1];
    const userData = await this.unsplash.fetchFromUnsplash(
      unsplashConstant.mainUrl(`users/${username}`),
    );
    const newPhotographer = this.photographerRepository.create(userData);
    return newPhotographer;
  }

  findAll() {
    // TODO: only for admins (maybe)
    return `This action returns all photographers`;
  }

  findOne(idOrUsername: string) {
    if (idOrUsername.startsWith('@')) {
      idOrUsername = idOrUsername.substring(1);
      return this.photographerRepository.findByUsername(idOrUsername);
    }
    return this.photographerRepository.findById(idOrUsername);
  }

  async update(id: string) {
    const photographer = await this.photographerRepository.findById(id);
    const newPhotographer = await this.unsplash.fetchFromUnsplash(
      unsplashConstant.mainUrl(`users/${photographer.username}`),
    );
    return this.photographerRepository.update(id, newPhotographer);
  }

  remove(id: string) {
    return this.photographerRepository.remove(id);
  }
}
