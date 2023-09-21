import { IsOptional, IsString } from 'class-validator';
import { ApiPropertyOptional } from '@nestjs/swagger';

export class UpdateUserDto {
  @ApiPropertyOptional({
    example: 'James Hetfield',
    description: "User's name",
  })
  @IsString()
  @IsOptional()
  name?: string;

  @ApiPropertyOptional({
    example: '+1-505-555-14875',
    description: 'Phone number',
  })
  @IsString()
  @IsOptional()
  number?: string;

  @ApiPropertyOptional({
    example: 'j.hetfield@aol.com',
    description: "User's Email",
  })
  @IsOptional()
  @IsString()
  email?: string;

  @ApiPropertyOptional({
    example: '@jhets',
    description: "User's Telegram",
  })
  @IsOptional()
  @IsString()
  telegram?: string;

  @ApiPropertyOptional({
    example: 'https://www.linkedin.com/in/james-hetfield',
    description: "User's LinkedIn",
  })
  @IsOptional()
  @IsString()
  linkedin?: string;

  @ApiPropertyOptional({
    example: '@j.hets',
    description: "User's Instagram",
  })
  @IsOptional()
  @IsString()
  instagram?: string;

  @ApiPropertyOptional({
    example: 'https://github.com/James-Hetfield/',
    description: "User's GitHub",
  })
  @IsOptional()
  @IsString()
  github?: string;

  @ApiPropertyOptional({
    example: 'https://www.facebook.com/mr.hetfield/',
    description: "User's Facebook",
  })
  @IsOptional()
  @IsString()
  facebook?: string;

  @ApiPropertyOptional({
    example: 'https://twitter.com/therealhetfield',
    description: "User's Twitter",
  })
  @IsOptional()
  @IsString()
  twitter?: string;

  @ApiPropertyOptional({
    example: 'https://bitbucket.org/JHetf/',
    description: "User's Bitbucket",
  })
  @IsOptional()
  @IsString()
  bitbucket?: string;

  @ApiPropertyOptional({
    example: '+1-505-555-14875',
    description: "User's Viber",
  })
  @IsOptional()
  @IsString()
  viber?: string;

  @ApiPropertyOptional({
    example: '+1-505-555-14875',
    description: "User's WhatsApp",
  })
  @IsOptional()
  @IsString()
  whatsapp?: string;

  @ApiPropertyOptional({
    example:
      'http://res.cloudinary.com/dngqobweq/image/upload/v1695303762/pb_avatars/650c2e487884278b0c149758/650c2e48788g2y23fsfdh3s758.jpg',
    description: "User's Avatar",
  })
  @IsOptional()
  avatar?: string;
}
