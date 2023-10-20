import { IsEmail, IsOptional, IsString } from 'class-validator';
import { ApiPropertyOptional } from '@nestjs/swagger';

export class ContactUpdateDto {
  @ApiPropertyOptional({
    example: 'James Hetfield',
    description: "Contact's name",
  })
  @IsString()
  @IsOptional()
  name?: string;

  @ApiPropertyOptional({
    example: '+1-505-555-14875',
    description: "Contact's number",
  })
  @IsString()
  @IsOptional()
  number?: string;

  @ApiPropertyOptional({
    example: 'j.hetfield@aol.com',
    description: "Contact's email",
  })
  @IsEmail()
  @IsOptional()
  email?: string;

  @ApiPropertyOptional({
    example: '@jhets',
    description: "Contact's Telegram",
  })
  @IsString()
  @IsOptional()
  telegram?: string;

  @ApiPropertyOptional({
    example: 'https://www.linkedin.com/in/james-hetfield',
    description: "Contact's LinkedIn",
  })
  @IsString()
  @IsOptional()
  linkedin?: string;

  @ApiPropertyOptional({
    example: '@j.hets',
    description: "Contact's Instagram",
  })
  @IsString()
  @IsOptional()
  instagram?: string;

  @ApiPropertyOptional({
    example: 'https://github.com/James-Hetfield/',
    description: "Contact's GitHub",
  })
  @IsString()
  @IsOptional()
  github?: string;

  // @ApiPropertyOptional({
  //   example: 'https://www.facebook.com/mr.hetfield/',
  //   description: "Contact's Facebook",
  // })
  // @IsString()
  // @IsOptional()
  // facebook?: string;

  @ApiPropertyOptional({
    example: 'https://twitter.com/therealhetfield',
    description: "Contact's Twitter",
  })
  @IsString()
  @IsOptional()
  twitter?: string;

  @ApiPropertyOptional({
    example: 'https://bitbucket.org/JHetf/',
    description: "Contact's BitBucket",
  })
  @IsString()
  @IsOptional()
  bitbucket?: string;

  @ApiPropertyOptional({
    example: '+1-505-555-14875',
    description: "Contact's Viber",
  })
  @IsString()
  @IsOptional()
  viber?: string;

  @ApiPropertyOptional({
    example: '+1-505-555-14875',
    description: "Contact's WhatsApp",
  })
  @IsString()
  @IsOptional()
  whatsapp?: string;

  @ApiPropertyOptional({
    example:
      'http://res.cloudinary.com/dngqobweq/image/upload/v1695303762/pb_avatars/650c2e487884278b0c149758/650c2e48788g2y23fsfdh3s758.jpg',
    description: "User's Avatar",
  })
  @IsOptional()
  avatar?: string;
}
