import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Types } from 'mongoose';
import { User } from 'src/users/users.model';
import { ApiResponseProperty } from '@nestjs/swagger';

export type ContactDocument = HydratedDocument<Contact>;

@Schema({ versionKey: false, timestamps: true })
export class Contact {
  @ApiResponseProperty({
    example: '64e7b40704f6b0d4d0440b26',
  })
  _id?: string;

  @ApiResponseProperty({
    example: 'James Hetfield',
  })
  @Prop()
  name: string;

  @ApiResponseProperty({
    example: '+1-505-555-14875',
  })
  @Prop()
  number: string;

  @ApiResponseProperty({
    example: '64e7b40704f6b0d4d0440b26',
  })
  @Prop({ type: Types.ObjectId, ref: User.name })
  owner: User;
}

export const ContactSchema = SchemaFactory.createForClass(Contact);
