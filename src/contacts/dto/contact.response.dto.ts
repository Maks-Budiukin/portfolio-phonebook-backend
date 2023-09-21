import { IsEmail, IsString } from 'class-validator';
import { ApiResponseProperty } from '@nestjs/swagger';
import { ObjectId } from 'mongoose';

export class ContactResponsetDto {
  @ApiResponseProperty({
    example: '64e7b40704f6b0d4d0440b26',
  })
  @IsString()
  _id: ObjectId;

  @ApiResponseProperty({
    example: 'James Hetfield',
  })
  @IsString()
  name: string;

  @ApiResponseProperty({
    example: '+1-505-555-14875',
  })
  @IsString()
  number: string;

  @ApiResponseProperty({
    example: 'j.hetfield@aol.com',
  })
  @IsEmail()
  email: string;

  @ApiResponseProperty({
    example: '@jhets',
  })
  @IsString()
  telegram: string;

  @ApiResponseProperty({
    example: 'https://www.linkedin.com/in/james-hetfield',
  })
  @IsString()
  linkedin: string;

  @ApiResponseProperty({
    example: '@j.hets',
  })
  @IsString()
  instagram: string;

  @ApiResponseProperty({
    example: 'https://github.com/James-Hetfield/',
  })
  @IsString()
  github: string;

  @ApiResponseProperty({
    example: 'https://www.facebook.com/mr.hetfield/',
  })
  @IsString()
  facebook: string;

  @ApiResponseProperty({
    example: 'https://twitter.com/therealhetfield',
  })
  @IsString()
  twitter: string;

  @ApiResponseProperty({
    example: 'https://bitbucket.org/JHetf/',
  })
  @IsString()
  bitbucket: string;

  @ApiResponseProperty({
    example: '+1-505-555-14875',
  })
  @IsString()
  viber: string;

  @ApiResponseProperty({
    example: '+1-505-555-14875',
  })
  @IsString()
  whatsapp: string;

  @ApiResponseProperty({
    example:
      'http://res.cloudinary.com/dngqobweq/image/upload/v1695303762/pb_avatars/650c2e487884278b0c149758/650c2e48788g2y23fsfdh3s758.jpg',
  })
  avatar: string;
}
