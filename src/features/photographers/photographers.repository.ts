import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { MongoError } from 'mongodb';
import { Model } from 'mongoose';
import { IPhotographer } from './interfaces/photographers.interfaces';
import {
  Photographer,
  PhotographerDocument,
} from './schemas/photographers.schemas';

@Injectable()
export class PhotographerRepository {
  constructor(
    @InjectModel(Photographer.name)
    private readonly photographerModel: Model<Photographer>,
  ) {}

  async create(photographer: IPhotographer): Promise<PhotographerDocument> {
    const newPhotographerModel = new this.photographerModel(photographer);
    try {
      const newPhotographer = await newPhotographerModel.save();
      return newPhotographer;
    } catch (error) {
      if (error instanceof MongoError && error.code === 11000) {
        return await this.findByUnsplashId(photographer.id);
      }
      throw new InternalServerErrorException(error.message);
    }
  }

  async findAll(): Promise<PhotographerDocument[]> {
    const photographers = await this.photographerModel.find();
    return photographers;
  }

  async findByUnsplashId(id: string): Promise<PhotographerDocument> {
    // TODO: add image count or images
    const photographer = await this.photographerModel.findOne({ id });
    if (!photographer) throw new NotFoundException();
    return photographer;
  }

  async findById(id: string): Promise<PhotographerDocument> {
    // TODO: add image count or images
    const photographer = await this.photographerModel.findById(id);
    if (!photographer) throw new NotFoundException();
    return photographer;
  }

  async findByUsername(username: string): Promise<PhotographerDocument> {
    // TODO: add image count or images
    const photographer = await this.photographerModel.findOne({ username });
    if (!photographer) throw new NotFoundException();
    return photographer;
  }

  async update(
    id: string,
    photographer: IPhotographer,
  ): Promise<PhotographerDocument> {
    const updatedPhotographer = await this.photographerModel.findByIdAndUpdate(
      id,
      photographer,
      { new: true },
    );
    return updatedPhotographer;
  }

  async remove(id: string): Promise<PhotographerDocument> {
    const photographer = await this.photographerModel.findByIdAndDelete(id);
    if (!photographer) throw new NotFoundException();
    return photographer;
  }
}
