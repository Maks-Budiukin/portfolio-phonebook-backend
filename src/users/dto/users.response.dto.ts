import {
  IsEmail,
  IsNotEmpty,
  IsOptional,
  IsString,
  MinLength,
} from 'class-validator';
import {
  ApiProperty,
  ApiPropertyOptional,
  ApiResponseProperty,
} from '@nestjs/swagger';

export class UserResponseDto {
  @ApiResponseProperty({
    example: '64e7b40704f6b0d4d0440b26',
  })
  @IsString()
  _id: string;

  @ApiResponseProperty({
    example: 'Bob Marley',
  })
  @IsString()
  name: string;

  @ApiResponseProperty({
    example: 'bobmarley@gmail.com',
  })
  @IsEmail()
  @IsString()
  email: string;

  @ApiResponseProperty({
    example: '+1-505-555-14875',
  })
  @IsString()
  number: string;

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
      '{ X500: avatars/25235252523fsfs5wf/ava0X500.webp, X200: avatars/25235252523fsfs5wf/ava0X200.webp }',
  })
  avatar: string;

  @ApiResponseProperty({
    example: 'Password1',
  })
  @IsString()
  password: string;

  @ApiResponseProperty({
    example: 'k435bbk345bk.353nnwnfnn5nnl25nl.nn25l25j33jj3',
  })
  token: string;

  @ApiResponseProperty({
    example: 'k435bb-353nnwn-l25nl-5j33jj3',
  })
  shareLink: string;
}
