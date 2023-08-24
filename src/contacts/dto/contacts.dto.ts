import { IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

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
    example: '+1-505-555-14875',
    description: 'Phone number',
  })
  @IsString()
  @IsNotEmpty()
  number: string;

  owner: string;
}
