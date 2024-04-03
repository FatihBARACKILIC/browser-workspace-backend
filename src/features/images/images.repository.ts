import {
  Injectable,
  InternalServerErrorException,
  Logger,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { MongoError } from 'mongodb';
import { Model } from 'mongoose';
import { IImage } from './interfaces/images.interface';
import { Image, ImageDocument } from './schemas/images.schema';

@Injectable()
export class ImageRepository {
  private readonly logger = new Logger(ImageRepository.name);

  constructor(
    @InjectModel(Image.name) private readonly imageModel: Model<Image>,
  ) {}

  async create(image: IImage): Promise<ImageDocument> {
    const slug = this.removeIdFromSlug(image.slug, image.id);
    const newImageModel = new this.imageModel({ ...image, slug });
    try {
      const newImage = await newImageModel.save();
      return newImage;
    } catch (error) {
      if (error instanceof MongoError && error.code === 11000) {
        return await this.findByUnsplashId(image.id);
      }
      throw new InternalServerErrorException(error.message);
    }
  }

  async findAll(): Promise<ImageDocument[]> {
    const images = await this.imageModel.find().populate('photographer').exec();
    return images;
  }

  async findById(id: string): Promise<ImageDocument> {
    const image = await this.imageModel
      .findById(id)
      .populate('photographer')
      .exec();
    if (!image) throw new NotFoundException();
    return image;
  }

  async findByUnsplashId(id: string): Promise<ImageDocument> {
    const image = await this.imageModel
      .findOne({ id })
      .populate('photographer')
      .exec();
    if (!image) throw new NotFoundException();
    return image;
  }

  async randomImage() {
    const imageCount = await this.imageModel.countDocuments();
    const random = Math.floor(Math.random() * imageCount);
    const image = await this.imageModel
      .findOne()
      .skip(random)
      .populate('photographer')
      .exec();
    return image;
  }

  async update(id: string, image: IImage): Promise<ImageDocument> {
    const slug = this.removeIdFromSlug(image.slug, image.id);
    const updatedImage = await this.imageModel.findByIdAndUpdate(
      id,
      {
        ...image,
        slug,
      },
      { new: true },
    );
    return updatedImage;
  }

  async remove(id: string): Promise<ImageDocument> {
    const image = await this.imageModel.findByIdAndDelete(id);
    if (!image) throw new NotFoundException();
    return image;
  }

  private removeIdFromSlug(slug: string, id: string) {
    return slug.replace(`-${id}`, '');
  }
}
