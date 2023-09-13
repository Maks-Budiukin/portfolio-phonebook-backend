import {
  IsEmail,
  IsNotEmpty,
  IsOptional,
  IsString,
  MinLength,
} from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
// import { Avatar } from 'src/contacts/contacts.model';

class Avatar {
  X200: string;
  X500: string;
}

export class UserDto {
  @IsOptional()
  @IsString()
  _id?: string;

  @ApiPropertyOptional({
    example: 'Bob Marley',
    description: 'Username',
  })
  @IsString()
  @IsOptional()
  name?: string;

  @ApiProperty({
    example: 'bobmarley@gmail.com',
    description: "User's email",
  })
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @ApiPropertyOptional({
    example: '+1-505-555-14875',
    description: 'Phone number',
  })
  @IsString()
  @IsOptional()
  number?: string;

  @ApiPropertyOptional({
    example: '@jhets',
    description: "Contact's Telegram",
  })
  @IsOptional()
  @IsString()
  telegram?: string;

  @ApiPropertyOptional({
    example: 'https://www.linkedin.com/in/james-hetfield',
    description: "Contact's LinkedIn",
  })
  @IsOptional()
  @IsString()
  linkedin?: string;

  @ApiPropertyOptional({
    example: '@j.hets',
    description: "Contact's Instagram",
  })
  @IsOptional()
  @IsString()
  instagram?: string;

  @ApiPropertyOptional({
    example: 'https://github.com/James-Hetfield/',
    description: "Contact's GitHub",
  })
  @IsOptional()
  @IsString()
  github?: string;

  @ApiPropertyOptional({
    example: 'https://www.facebook.com/mr.hetfield/',
    description: "Contact's Facebook",
  })
  @IsOptional()
  @IsString()
  facebook?: string;

  @ApiPropertyOptional({
    example: 'https://twitter.com/therealhetfield',
    description: "Contact's Twitter",
  })
  @IsOptional()
  @IsString()
  twitter?: string;

  @ApiPropertyOptional({
    example: 'https://bitbucket.org/JHetf/',
    description: "Contact's Bitbucket",
  })
  @IsOptional()
  @IsString()
  bitbucket?: string;

  @ApiPropertyOptional({
    example: '+1-505-555-14875',
    description: "Contact's Viber",
  })
  @IsOptional()
  @IsString()
  viber?: string;

  @ApiPropertyOptional({
    example: '+1-505-555-14875',
    description: "Contact's WhatsApp",
  })
  @IsOptional()
  @IsString()
  whatsapp?: string;

  @ApiProperty({
    example:
      '{ X500: avatars/25235252523fsfs5wf/ava0X500.webp, X200: avatars/25235252523fsfs5wf/ava0X200.webp }',
    description: "User's Avatar",
  })
  @IsOptional()
  avatar?: Avatar;

  @ApiProperty({
    example: 'Password1',
    description: "User's password",
  })
  @IsString()
  @IsNotEmpty()
  @MinLength(6, { message: 'Min password length is 6 symbols' })
  password: string;

  @IsOptional()
  token?: string;

  @IsOptional()
  shareLink?: string;
}
