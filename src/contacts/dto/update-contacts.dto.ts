import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class UpdateContactDto {
  @IsString()
  @IsNotEmpty()
  @IsOptional()
  name: string;

  @IsString()
  @IsNotEmpty()
  @IsOptional()
  number: string;
}
