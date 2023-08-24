import { IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateContactDto {
  @ApiProperty({
    example: 'James Hetfield',
    description: "Contact's name",
  })
  @IsString()
  @IsNotEmpty()
  @IsOptional()
  name: string;

  @ApiProperty({
    example: '+1-505-555-14875',
    description: 'Phone number',
  })
  @IsString()
  @IsNotEmpty()
  @IsOptional()
  number: string;
}
