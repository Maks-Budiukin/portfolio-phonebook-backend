import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import { ApiResponseProperty } from '@nestjs/swagger';
// import { Avatar } from 'src/contacts/contacts.model';

class Avatar {
  X200: string;
  X500: string;
}

export type UserDocument = HydratedDocument<User>;

@Schema({ versionKey: false, timestamps: true })
export class User {
  @ApiResponseProperty({
    example: '64e7b40704f6b0d4d0440b26',
  })
  _id?: string;

  @ApiResponseProperty({
    example: 'Bob Marley',
  })
  @Prop()
  name?: string;

  @ApiResponseProperty({
    example: 'bobmarley@gmail.com',
  })
  @Prop({ unique: true })
  email: string;

  @ApiResponseProperty({
    example: '+1-505-555-14875',
  })
  @Prop({ default: null })
  number?: string;

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
    example:
      '{ X500: avatars/25235252523fsfs5wf/ava0X500.webp, X200: avatars/25235252523fsfs5wf/ava0X200.webp }',
  })
  @Prop({ default: null })
  avatar?: Avatar;

  @Prop()
  password: string;

  @ApiResponseProperty({
    example:
      'eyJhbGciOiJIUzI1NiJ9.NjRlNTMxMzAwYTIxYjQ4MjZmNzFhYjU3.sRU-uxd3U5nKvO8BYQOUn7qMkZD9xSW1JDX5IKQaJHE',
  })
  @Prop({ default: null })
  token: string;

  @ApiResponseProperty({
    example: 'ggsgs3t45sdf2-etfgs3-vvbzzz',
  })
  @Prop({ default: null })
  shareLink: string;
}

export const UserSchema = SchemaFactory.createForClass(User);
