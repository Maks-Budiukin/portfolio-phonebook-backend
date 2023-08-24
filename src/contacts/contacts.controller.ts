import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import { ContactsService } from './contacts.service';
import { Request } from 'express';
import { JwtAuthGuard } from 'src/users/guards/jwt.guard';
import { ContactDto } from './dto/contacts.dto';
import { UpdateContactDto } from './dto/update-contacts.dto';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { Contact } from './contacts.model';

@ApiTags('Contacts')
@UseGuards(JwtAuthGuard)
@Controller('contacts')
@ApiBearerAuth()
export class ContactsController {
  constructor(private readonly contactsService: ContactsService) {}

  // @UseGuards(JwtAuthGuard)
  @Get('')
  @ApiOperation({ summary: 'Get contacts' })
  @ApiResponse({
    status: 200,
    description: 'List of contacts',
    type: Contact,
    isArray: true,
  })
  async getAllContacts(@Req() request: Request) {
    return await this.contactsService.getContacts(request.user);
  }

  // @UseGuards(JwtAuthGuard)
  @Post('')
  @ApiOperation({ summary: 'Create contact' })
  @ApiResponse({
    status: 201,
    description: "Created contact's object",
    type: Contact,
  })
  async createContact(@Body() dto: ContactDto, @Req() request: Request) {
    return await this.contactsService.addContact(dto, request.user);
  }

  // @UseGuards(JwtAuthGuard)
  @Patch(':id')
  @ApiOperation({ summary: 'Update contact info' })
  @ApiResponse({
    status: 200,
    description: "Updated contact's object",
    type: Contact,
  })
  async updateContact(
    @Body() dto: UpdateContactDto,
    @Param('id') id: string,
    @Req() request: Request,
  ) {
    return await this.contactsService.updateContact(dto, id, request.user);
  }

  // @UseGuards(JwtAuthGuard)
  @Delete(':id')
  @ApiOperation({ summary: 'Delete contact' })
  @ApiResponse({
    status: 200,
    description: "Deleted contact's object",
    type: Contact,
  })
  async deleteContact(@Param('id') id: string, @Req() request: Request) {
    return await this.contactsService.deleteContact(id, request.user);
  }
}
