import {
  Body,
  Controller,
  HttpCode,
  Post,
  Get,
  Req,
  UseGuards,
  Param,
  Patch,
  UseInterceptors,
  UploadedFile,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiBody,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { UsersService } from './users.service';
import { Request } from 'express';
import { JwtAuthGuard } from './guards/jwt.guard';
import { User } from './users.model';
import { UpdateUserDto } from './dto/update-users.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { GetUser } from '../decorators/getuser.decorator';
import { UserResponseDto } from './dto/users.response.dto';
import { UserCreateDto } from './dto/create-user.dto';

@ApiTags('Users')
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post('register')
  @ApiOperation({ summary: 'Create user' })
  @ApiResponse({
    status: 201,
    description: 'User created',
    type: Object,
  })
  async register(@Body() dto: UserCreateDto): Promise<void> {
    return await this.usersService.createUser(dto);
  }

  @Post('login')
  @HttpCode(200)
  @ApiOperation({ summary: 'Login user' })
  @ApiResponse({
    status: 200,
    description: 'Logged-in user object',
    type: UserResponseDto,
  })
  async login(@Body() dto: UserCreateDto): Promise<UserResponseDto> {
    const user = await this.usersService.validateUser(dto);
    return await this.usersService.loginUser(user);
  }

  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @Get('logout')
  @HttpCode(204)
  @ApiOperation({ summary: 'Logout user' })
  @ApiResponse({
    status: 204,
    description: 'User logged out',
  })
  async logout(@GetUser() user: UserResponseDto): Promise<void> {
    return await this.usersService.logoutUser(user);
  }

  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @Patch(':id')
  @ApiOperation({ summary: 'Update user info' })
  @ApiResponse({
    status: 200,
    description: "Updated user's object",
    type: UserResponseDto,
  })
  @UseInterceptors(FileInterceptor('files'))
  async updateUser(
    @Body() dto: UpdateUserDto,
    @Param('id') id: string,
    @UploadedFile() file: Express.Multer.File,
  ): Promise<UserResponseDto> {
    return await this.usersService.updateUser(dto, id, file);
  }

  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Refresh user' })
  @ApiResponse({
    status: 200,
    description: 'Current user object',
    type: UserResponseDto,
  })
  @Get('current')
  async refresh(@GetUser() user: UserResponseDto): Promise<UserResponseDto> {
    return await this.usersService.refreshfUser(user);
  }

  @ApiOperation({ summary: 'Share user' })
  @ApiResponse({
    status: 200,
    description: 'User object to share',
    type: UserResponseDto,
  })
  @Get('share/:shareLink/:id')
  async share(
    @Param('id') id: string,
    @Param('shareLink') shareLink: string,
  ): Promise<UserResponseDto> {
    return await this.usersService.shareContact(id, shareLink);
  }
}
