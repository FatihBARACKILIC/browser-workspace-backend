import { Module } from '@nestjs/common';
import { CollectionsService } from './collections.service';
import { CollectionsController } from './collections.controller';
import { CollectionsRepository } from './collections.repository';
import { MongooseModule } from '@nestjs/mongoose';
import { Collection, CollectionSchema } from './schema/collections.schema';
import { UnsplashModule } from 'src/modules/unsplash/unsplash.module';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Collection.name, schema: CollectionSchema },
    ]),
    UnsplashModule,
  ],
  controllers: [CollectionsController],
  providers: [CollectionsService, CollectionsRepository],
  exports: [CollectionsRepository],
})
export class CollectionsModule {}
