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
    example: 'j.hetfield@aol.com',
  })
  @Prop({ default: null })
  email?: string;

  @ApiResponseProperty({
    example: '@jhets',
  })
  @Prop({ default: null })
  telegram?: string;

  @ApiResponseProperty({
    example: 'https://www.linkedin.com/in/james-hetfield',
  })
  @Prop({ default: null })
  linkedin?: string;

  @ApiResponseProperty({
    example: '@j.hets',
  })
  @Prop({ default: null })
  instagram?: string;

  @ApiResponseProperty({
    example: 'https://github.com/James-Hetfield/',
  })
  @Prop({ default: null })
  github?: string;

  @ApiResponseProperty({
    example: 'https://www.facebook.com/mr.hetfield/',
  })
  @Prop({ default: null })
  facebook?: string;

  @ApiResponseProperty({
    example: 'https://twitter.com/therealhetfield',
  })
  @Prop({ default: null })
  twitter?: string;

  @ApiResponseProperty({
    example: 'https://bitbucket.org/JHetf/',
  })
  @Prop({ default: null })
  bitbucket?: string;

  @ApiResponseProperty({
    example: '+1-505-555-14875',
  })
  @Prop({ default: null })
  viber?: string;

  @ApiResponseProperty({
    example: '+1-505-555-14875',
  })
  @Prop({ default: null })
  whatsapp?: string;

  @ApiResponseProperty({
    example: '64e7b40704f6b0d4d0440b26',
  })
  @Prop({ type: Types.ObjectId, ref: User.name })
  owner: User;
}

export const ContactSchema = SchemaFactory.createForClass(Contact);
