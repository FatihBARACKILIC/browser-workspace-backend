import { Prop, Schema, SchemaFactory, raw } from '@nestjs/mongoose';
import { HydratedDocument, Types } from 'mongoose';
import { ILinks, IUrls } from '../interfaces/images.interface';
import { Photographer } from 'src/features/photographers/schemas/photographers.schemas';

export type ImageDocument = HydratedDocument<Image>;

@Schema({ collection: 'images' })
export class Image {
  @Prop({ required: true, unique: true })
  id: string;
  @Prop({ required: true })
  slug: string;
  @Prop({ required: true })
  width: number;
  @Prop({ required: true })
  height: number;
  @Prop({ required: true })
  color: string;
  @Prop()
  blur_hash: string;
  @Prop()
  description: string;
  @Prop()
  alt_description: string;
  @Prop(
    raw({
      raw: { type: String },
      full: { type: String },
      regular: { type: String },
      small: { type: String },
      thumb: { type: String },
      small_s3: { type: String },
    }),
  )
  urls: IUrls;
  @Prop(
    raw({
      html: { type: String },
      download: { type: String },
    }),
  )
  links: ILinks;
  @Prop({ type: Types.ObjectId, ref: 'Photographer', required: true })
  photographer: Photographer;
}

export const ImageSchema = SchemaFactory.createForClass(Image);
