import {
  Body,
  Controller,
  HttpCode,
  Post,
  Get,
  Req,
  UseGuards,
} from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { UsersService } from './users.service';
import { UserDto } from './dto/users.dto';
import { Request } from 'express';
import { JwtAuthGuard } from './guards/jwt.guard';
import { User } from './users.model';

@ApiTags('Users')
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post('register')
  @ApiOperation({ summary: 'Create user' })
  @ApiResponse({
    status: 201,
    description: 'User created',
  })
  async register(@Body() dto: UserDto) {
    return await this.usersService.createUser(dto);
  }

  @Post('login')
  @HttpCode(200)
  @ApiOperation({ summary: 'Login user' })
  @ApiResponse({
    status: 200,
    description: 'Logged-in user object',
    type: User,
  })
  async login(@Body() dto: UserDto) {
    const user = await this.usersService.validateUser(dto);
    return await this.usersService.loginUser(user);
  }

  @UseGuards(JwtAuthGuard)
  @Get('logout')
  @HttpCode(204)
  @ApiOperation({ summary: 'Logout user' })
  @ApiResponse({
    status: 204,
    description: 'User logged out',
  })
  async logout(@Req() request: Request) {
    return await this.usersService.logoutUser(request.user);
  }

  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: 'Refresh user' })
  @ApiResponse({
    status: 200,
    description: 'Current user object',
    type: User,
  })
  @Get('current')
  async refresh(@Req() request: Request) {
    return await this.usersService.refreshfUser(request.user);
  }
}