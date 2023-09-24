import {
  BadRequestException,
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Contact, ContactDocument } from './contacts.model';
import { Model } from 'mongoose';

import { ContactUpdateDto } from './dto/update-contacts.dto';
import { UserResponseDto } from 'src/users/dto/users.response.dto';
import { CloudinaryService } from 'src/cloudinary/cloudinary.service';
import { ContactResponsetDto } from './dto/contact.response.dto';
import { ContactCreateDto } from './dto/create-contact.dto';

@Injectable()
export class ContactsService {
  constructor(
    @InjectModel(Contact.name)
    private readonly contactModel: Model<ContactDocument>,
    private readonly cloudinaryService: CloudinaryService,
  ) {}

  async getContacts(user: UserResponseDto): Promise<ContactResponsetDto[]> {
    const contacts = await this.contactModel
      .find({ owner: user._id })
      .select('-updatedAt -createdAt');
    return contacts;
  }

  async addContact(
    dto: ContactCreateDto,
    user: UserResponseDto,
    file: Express.Multer.File,
  ): Promise<ContactResponsetDto> {
    const existingNumber = await this.contactModel.findOne({
      number: dto.email,
      owner: user._id,
    });
    if (existingNumber) {
      throw new ConflictException(
        'You already have this contact! Try to edit it!',
      );
    }

    const newContact = await this.contactModel.create({
      ...dto,
      owner: user._id,
    });

    if (file) {
      const avatar = await this.cloudinaryService.uploadImage(
        file,
        user,
        newContact._id.toString(),
      );
      await this.contactModel.findByIdAndUpdate(newContact._id, {
        avatar: avatar.url,
      });
    }

    const contact = await this.contactModel
      .findById(newContact._id)
      .select('-updatedAt -createdAt');
    return contact;
  }

  async updateContact(
    dto: ContactUpdateDto,
    id: string,
    user: UserResponseDto,
    file: Express.Multer.File,
  ): Promise<ContactResponsetDto> {
    if (Object.keys(dto).length === 0 && !file) {
      throw new BadRequestException('At least one field required!');
    }

    const contactToUpdate = await this.contactModel.findById(id);

    if (!contactToUpdate) {
      throw new NotFoundException('No such contact!');
    }
    if (user._id.toString() !== contactToUpdate.owner.toString()) {
      throw new NotFoundException('No such contact!');
    }

    if (file) {
      const avatar = await this.cloudinaryService.uploadImage(
        file,
        user,
        contactToUpdate._id.toString(),
      );
      dto.avatar = 'avatar.url';
    }

    const updatedContact = await this.contactModel
      .findByIdAndUpdate(id, dto, {
        new: true,
      })
      .select('-updatedAt -createdAt');

    return updatedContact;
  }

  async deleteContact(
    id: string,
    user: UserResponseDto,
  ): Promise<ContactResponsetDto> {
    const contactToDelete = await this.contactModel.findById(id);
    if (user._id.toString() !== contactToDelete.owner.toString()) {
      throw new NotFoundException('No such contact!');
    }
    const deletedContact = await this.contactModel
      .findByIdAndDelete(id)
      .select('-updatedAt -createdAt');
    return deletedContact;
  }
}
