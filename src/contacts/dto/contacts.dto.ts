import { IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { Avatar } from '../contacts.model';

export class ContactDto {
  @IsOptional()
  @IsString()
  _id?: string;

  @ApiProperty({
    example: 'James Hetfield',
    description: "Contact's name",
  })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({
    example: 'j.hetfield@aol.com',
    description: "Contact's Email",
  })
  @IsOptional()
  @IsString()
  email?: string;

  @ApiProperty({
    example: '+1-505-555-14875',
    description: 'Phone number',
  })
  @IsString()
  @IsNotEmpty()
  number: string;

  @ApiProperty({
    example: '@jhets',
    description: "Contact's Telegram",
  })
  @IsOptional()
  @IsString()
  telegram?: string;

  @ApiProperty({
    example: 'https://www.linkedin.com/in/james-hetfield',
    description: "Contact's LinkedIn",
  })
  @IsOptional()
  @IsString()
  linkedin?: string;

  @ApiProperty({
    example: '@j.hets',
    description: "Contact's Instagram",
  })
  @IsOptional()
  @IsString()
  instagram?: string;

  @ApiProperty({
    example: 'https://github.com/James-Hetfield/',
    description: "Contact's GitHub",
  })
  @IsOptional()
  @IsString()
  github?: string;

  @ApiProperty({
    example: 'https://www.facebook.com/mr.hetfield/',
    description: "Contact's Facebook",
  })
  @IsOptional()
  @IsString()
  facebook?: string;

  @ApiProperty({
    example: 'https://twitter.com/therealhetfield',
    description: "Contact's Twitter",
  })
  @IsOptional()
  @IsString()
  twitter?: string;

  @ApiProperty({
    example: 'https://bitbucket.org/JHetf/',
    description: "Contact's Bitbucket",
  })
  @IsOptional()
  @IsString()
  bitbucket?: string;

  @ApiProperty({
    example: '+1-505-555-14875',
    description: "Contact's Viber",
  })
  @IsOptional()
  @IsString()
  viber?: string;

  @ApiProperty({
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

  owner: string;
}
