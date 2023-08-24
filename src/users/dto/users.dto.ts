import {
  IsEmail,
  IsNotEmpty,
  IsOptional,
  IsString,
  MinLength,
} from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

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
}
