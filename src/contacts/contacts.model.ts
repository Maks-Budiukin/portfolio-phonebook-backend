import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Types } from 'mongoose';
import { User } from 'src/users/users.model';

export type ContactDocument = HydratedDocument<Contact>;

@Schema({ versionKey: false, timestamps: true })
export class Contact {
  @Prop()
  name: string;

  @Prop()
  number: string;

  @Prop({ type: Types.ObjectId, ref: User.name })
  owner: User;
}

export const ContactSchema = SchemaFactory.createForClass(Contact);
