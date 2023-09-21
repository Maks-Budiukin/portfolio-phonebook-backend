import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, ObjectId, Types } from 'mongoose';
import { User } from 'src/users/users.model';

export type ContactDocument = HydratedDocument<Contact>;

@Schema({ versionKey: false, timestamps: true })
export class Contact {
  _id?: ObjectId;

  @Prop()
  name: string;

  @Prop()
  email: string;

  @Prop()
  number: string;

  @Prop({ default: null })
  telegram: string;

  @Prop({ default: null })
  linkedin: string;

  @Prop({ default: null })
  instagram: string;

  @Prop({ default: null })
  github: string;

  @Prop({ default: null })
  facebook: string;

  @Prop({ default: null })
  twitter: string;

  @Prop({ default: null })
  bitbucket: string;

  @Prop({ default: null })
  viber: string;

  @Prop({ default: null })
  whatsapp: string;

  @Prop({ default: null })
  avatar: string;

  @Prop({ type: Types.ObjectId, ref: User.name })
  owner: User;
}

export const ContactSchema = SchemaFactory.createForClass(Contact);
