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

@Controller('contacts')
export class ContactsController {
  constructor(private readonly contactsService: ContactsService) {}

  @UseGuards(JwtAuthGuard)
  @Get('')
  async getAllContacts(@Req() request: Request) {
    return await this.contactsService.getContacts(request.user);
  }

  @UseGuards(JwtAuthGuard)
  @Post('')
  async createContact(@Body() dto: ContactDto, @Req() request: Request) {
    return await this.contactsService.addContact(dto, request.user);
  }

  @UseGuards(JwtAuthGuard)
  @Patch(':id')
  async updateContact(
    @Body() dto: UpdateContactDto,
    @Param('id') id: string,
    @Req() request: Request,
  ) {
    return await this.contactsService.updateContact(dto, id, request.user);
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  async deleteContact(@Param('id') id: string, @Req() request: Request) {
    return await this.contactsService.deleteContact(id, request.user);
  }
}
