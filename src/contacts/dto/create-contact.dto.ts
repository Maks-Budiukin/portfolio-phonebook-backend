import { IsEmail, IsOptional, IsString } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class ContactCreateDto {
  @ApiProperty({
    example: 'James Hetfield',
    description: "Contact's name",
  })
  @IsString()
  name: string;

  @ApiPropertyOptional({
    example: '+1-505-555-14875',
    description: "Contact's number",
  })
  @IsString()
  @IsOptional()
  number?: string;

  @ApiProperty({
    example: 'j.hetfield@aol.com',
    description: "Contact's email",
  })
  @IsEmail()
  email: string;

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

  @ApiPropertyOptional({
    example: 'https://www.facebook.com/mr.hetfield/',
    description: "Contact's Facebook",
  })
  @IsString()
  @IsOptional()
  facebook?: string;

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
}
