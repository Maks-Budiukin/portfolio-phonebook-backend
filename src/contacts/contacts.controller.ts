import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { ContactsService } from './contacts.service';
import { JwtAuthGuard } from 'src/users/guards/jwt.guard';
import { ContactUpdateDto } from './dto/update-contacts.dto';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { Contact } from './contacts.model';
import { FileInterceptor } from '@nestjs/platform-express';
import { UserResponseDto } from 'src/users/dto/users.response.dto';
import { GetUser } from 'src/decorators/getuser.decorator';
import { ContactResponsetDto } from './dto/contact.response.dto';
import { ContactCreateDto } from './dto/create-contact.dto';

@ApiTags('Contacts')
@UseGuards(JwtAuthGuard)
@ApiBearerAuth()
@Controller('contacts')
export class ContactsController {
  constructor(private readonly contactsService: ContactsService) {}

  @Get('')
  @ApiOperation({ summary: 'Get contacts' })
  @ApiResponse({
    status: 200,
    description: 'List of contacts',
    type: [ContactResponsetDto],
    isArray: true,
  })
  async getAllContacts(
    @GetUser() user: UserResponseDto,
  ): Promise<ContactResponsetDto[]> {
    return await this.contactsService.getContacts(user);
  }

  @Post('')
  @ApiOperation({ summary: 'Create contact' })
  @ApiResponse({
    status: 201,
    description: "Created contact's object",
    type: ContactResponsetDto,
  })
  @UseInterceptors(FileInterceptor('files'))
  async createContact(
    @Body() dto: ContactCreateDto,
    @GetUser() user: UserResponseDto,
    @UploadedFile() file: Express.Multer.File,
  ): Promise<ContactResponsetDto> {
    const newUser = await this.contactsService.addContact(dto, user, file);
    return newUser;
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update contact info' })
  @ApiResponse({
    status: 200,
    description: "Updated contact's object",
    type: ContactResponsetDto,
  })
  @UseInterceptors(FileInterceptor('files'))
  async updateContact(
    @Body() dto: ContactUpdateDto,
    @Param('id') id: string,
    @GetUser() user: UserResponseDto,
    @UploadedFile() file: Express.Multer.File,
  ): Promise<ContactResponsetDto> {
    return await this.contactsService.updateContact(dto, id, user, file);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete contact' })
  @ApiResponse({
    status: 200,
    description: "Deleted contact's object",
    type: Contact,
  })
  async deleteContact(
    @Param('id') id: string,
    @GetUser() user: UserResponseDto,
  ): Promise<ContactResponsetDto> {
    return await this.contactsService.deleteContact(id, user);
  }
}
