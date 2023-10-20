import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, ObjectId } from 'mongoose';

export type UserDocument = HydratedDocument<User>;

@Schema({ versionKey: false, timestamps: true })
export class User {
  _id?: ObjectId;

  @Prop()
  name: string;

  @Prop({ unique: true })
  authEmail: string;

  @Prop({ default: null })
  email: string;

  @Prop({ default: null })
  number: string;

  @Prop({ default: null })
  telegram: string;

  @Prop({ default: null })
  linkedin: string;

  @Prop({ default: null })
  instagram: string;

  @Prop({ default: null })
  github: string;

  // @Prop({ default: null })
  // facebook: string;

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

  @Prop()
  password: string;

  @Prop({ default: null })
  token: string;

  @Prop({ default: null })
  shareLink: string;
}

export const UserSchema = SchemaFactory.createForClass(User);
