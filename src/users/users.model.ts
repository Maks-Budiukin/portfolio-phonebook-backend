import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import { ApiResponseProperty } from '@nestjs/swagger';

export type UserDocument = HydratedDocument<User>;

@Schema({ versionKey: false, timestamps: true })
export class User {
  @ApiResponseProperty({
    example: '64e7b40704f6b0d4d0440b26',
  })
  _id: string;

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

  @Prop()
  password: string;

  @ApiResponseProperty({
    example:
      'eyJhbGciOiJIUzI1NiJ9.NjRlNTMxMzAwYTIxYjQ4MjZmNzFhYjU3.sRU-uxd3U5nKvO8BYQOUn7qMkZD9xSW1JDX5IKQaJHE',
  })
  @Prop({ default: null })
  token: string;
}

export const UserSchema = SchemaFactory.createForClass(User);
