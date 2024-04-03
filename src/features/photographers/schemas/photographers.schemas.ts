import { Prop, Schema, SchemaFactory, raw } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import {
  IPhotographer,
  IProfileImage,
  IProfileLinks,
  ISocial,
} from '../interfaces/photographers.interfaces';

export type PhotographerDocument = HydratedDocument<Photographer>;

@Schema({ collection: 'photographers' })
export class Photographer implements IPhotographer {
  @Prop({ required: true, unique: true })
  id: string;
  @Prop({ required: true, unique: true })
  username: string;
  @Prop({ required: true })
  name: string;
  @Prop()
  first_name: string;
  @Prop()
  last_name: string;
  @Prop()
  portfolio_url: string;
  @Prop()
  bio: string;
  @Prop()
  location: string;
  @Prop(
    raw({
      html: { type: String },
    }),
  )
  links: IProfileLinks;
  @Prop(
    raw({
      small: { type: String },
      medium: { type: String },
      large: { type: String },
    }),
  )
  profile_image: IProfileImage;
  @Prop(
    raw({
      instagram_username: { type: String },
      portfolio_url: { type: String },
      twitter_username: { type: String },
      paypal_email: { type: String },
    }),
  )
  social: ISocial;
}

export const PhotographerSchema = SchemaFactory.createForClass(Photographer);
