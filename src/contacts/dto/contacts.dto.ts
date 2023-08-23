import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class ContactDto {
  @IsOptional()
  @IsString()
  _id?: string;

  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsNotEmpty()
  number: string;

  owner: string;
}
