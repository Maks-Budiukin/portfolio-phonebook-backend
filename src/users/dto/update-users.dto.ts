import { IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateUserDto {
  @ApiProperty({
    example: 'James Hetfield',
    description: "User's name",
  })
  @IsString()
  @IsOptional()
  name?: string;

  @ApiProperty({
    example: '+1-505-555-14875',
    description: 'Phone number',
  })
  @IsString()
  @IsOptional()
  number?: string;

  @ApiProperty({
    example: 'j.hetfield@aol.com',
    description: "User's Email",
  })
  @IsOptional()
  @IsString()
  email?: string;

  @ApiProperty({
    example: '@jhets',
    description: "User's Telegram",
  })
  @IsOptional()
  @IsString()
  telegram?: string;

  @ApiProperty({
    example: 'https://www.linkedin.com/in/james-hetfield',
    description: "User's LinkedIn",
  })
  @IsOptional()
  @IsString()
  linkedin?: string;

  @ApiProperty({
    example: '@j.hets',
    description: "User's Instagram",
  })
  @IsOptional()
  @IsString()
  instagram?: string;

  @ApiProperty({
    example: 'https://github.com/James-Hetfield/',
    description: "User's GitHub",
  })
  @IsOptional()
  @IsString()
  github?: string;

  @ApiProperty({
    example: 'https://www.facebook.com/mr.hetfield/',
    description: "User's Facebook",
  })
  @IsOptional()
  @IsString()
  facebook?: string;

  @ApiProperty({
    example: 'https://twitter.com/therealhetfield',
    description: "User's Twitter",
  })
  @IsOptional()
  @IsString()
  twitter?: string;

  @ApiProperty({
    example: 'https://bitbucket.org/JHetf/',
    description: "User's Bitbucket",
  })
  @IsOptional()
  @IsString()
  bitbucket?: string;

  @ApiProperty({
    example: '+1-505-555-14875',
    description: "User's Viber",
  })
  @IsOptional()
  @IsString()
  viber?: string;

  @ApiProperty({
    example: '+1-505-555-14875',
    description: "User's WhatsApp",
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
  avatar?: string;
}
