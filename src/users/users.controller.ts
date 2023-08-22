import {
  Body,
  Controller,
  HttpCode,
  Post,
  Get,
  Req,
  UseGuards,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { UserDto } from './dto/users.dto';
import { Request } from 'express';
import { JwtAuthGuard } from './guards/jwt.guard';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post('register')
  async register(@Body() dto: UserDto) {
    return await this.usersService.createUser(dto);
  }

  @Post('login')
  @HttpCode(200)
  async login(@Body() dto: UserDto) {
    const user = await this.usersService.validateUser(dto);
    return await this.usersService.loginUser(user);
  }

  @UseGuards(JwtAuthGuard)
  @Get('logout')
  @HttpCode(204)
  async logout(@Req() request: Request) {
    return await this.usersService.logoutUser(request.user);
  }

  @UseGuards(JwtAuthGuard)
  @Get('current')
  async refresh(@Req() request: Request) {
    return await this.usersService.refreshfUser(request.user);
  }
}
