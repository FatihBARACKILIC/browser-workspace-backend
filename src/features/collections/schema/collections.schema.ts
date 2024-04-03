import { Prop, Schema, SchemaFactory, raw } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import { ILinks, ITag } from '../interface/collections.interface';

export type CollectionDocument = HydratedDocument<Collection>;

@Schema({ collection: 'collection' })
export class Collection {
  @Prop({ required: true, unique: true })
  id: string;
  @Prop({ required: true })
  title: string;
  @Prop()
  description: string;
  @Prop({ required: true })
  total_photos: number;
  @Prop(
    raw([
      {
        type: { type: String },
        title: { type: String },
      },
    ]),
  )
  tags: ITag[];
  @Prop(
    raw({
      self: { type: String },
      html: { type: String },
      photos: { type: String },
      related: { type: String },
    }),
  )
  links: ILinks;
}

export const CollectionSchema = SchemaFactory.createForClass(Collection);
