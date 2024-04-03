import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { MongoError } from 'mongodb';
import { Model } from 'mongoose';
import { ICollection } from './interface/collections.interface';
import { Collection, CollectionDocument } from './schema/collections.schema';

@Injectable()
export class CollectionsRepository {
  constructor(
    @InjectModel(Collection.name)
    private readonly collectionModel: Model<Collection>,
  ) {}

  async create(collection: ICollection): Promise<CollectionDocument> {
    const newCollectionModel = new this.collectionModel(collection);
    try {
      const newCollection = await newCollectionModel.save();
      return newCollection;
    } catch (error) {
      if (error instanceof MongoError && error.code === 11000) {
        return await this.findByUnsplashId(collection.id);
      }
      throw new InternalServerErrorException(error.message);
    }
  }

  async findAll(): Promise<CollectionDocument[]> {
    const collections = await this.collectionModel.find();
    if (!collections) throw new NotFoundException();
    return collections;
  }

  async findOldest(): Promise<CollectionDocument> {
    const collection = await this.collectionModel
      .findOne()
      .sort({ createdAt: 1 });
    if (!collection) throw new NotFoundException();
    return collection;
  }

  async findById(id: string): Promise<CollectionDocument> {
    const collection = await this.collectionModel.findById(id);
    if (!collection) throw new NotFoundException();
    return collection;
  }

  async findByUnsplashId(id: string): Promise<CollectionDocument> {
    const collection = await this.collectionModel.findOne({ id });
    if (!collection) throw new NotFoundException();
    return collection;
  }

  async remove(id: string): Promise<CollectionDocument> {
    const collection = await this.collectionModel.findByIdAndDelete(id);
    if (!collection) throw new NotFoundException();
    return collection;
  }
}
