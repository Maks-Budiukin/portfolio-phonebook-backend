import {
  BadRequestException,
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Contact, ContactDocument } from './contacts.model';
import { Model } from 'mongoose';
import { ContactDto } from './dto/contacts.dto';
import { UpdateContactDto } from './dto/update-contacts.dto';
import { FilesService } from 'src/files/files.service';
import { MFile } from 'src/files/mfile.class';
import { UserResponseDto } from 'src/users/dto/users.response.dto';
import { User } from 'src/users/users.model';
import { CloudinaryService } from 'src/cloudinary/cloudinary.service';

@Injectable()
export class ContactsService {
  constructor(
    @InjectModel(Contact.name)
    private readonly contactModel: Model<ContactDocument>,
    private readonly filesService: FilesService,
    private readonly cloudinaryService: CloudinaryService,
  ) {}

  async getContacts(user): Promise<Contact[]> {
    const contacts = await this.contactModel
      .find({ owner: user._id })
      .select('-updatedAt -createdAt');
    return contacts;
  }

  async addContact(dto: ContactDto, user, file: MFile): Promise<Contact> {
    const existingNumber = await this.contactModel.findOne({
      number: dto.number,
      owner: user._id,
    });
    if (existingNumber) {
      throw new ConflictException(
        'You already have this number! Try to edit it!',
      );
    }

    const newContact = await this.contactModel.create({
      ...dto,
      owner: user._id,
    });

    if (file) {
      const avatar = await this.filesService.changeContactAvatar(
        file,
        user,
        newContact._id,
      );
      await this.contactModel.findByIdAndUpdate(newContact._id, { avatar });
    }

    const contact = await this.contactModel
      .findById(newContact._id)
      .select('-updatedAt -createdAt');
    return contact;
  }

  async updateContact(
    dto: UpdateContactDto,
    id: string,
    user: User,
    file: Express.Multer.File,
  ): Promise<Contact> {
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

    // if (file) {
    //   const avatar = await this.filesService.changeContactAvatar(
    //     file,
    //     user,
    //     id,
    //   );
    //   await this.contactModel.findByIdAndUpdate(id, { avatar });
    // }

    if (file) {
      const avatar = await this.cloudinaryService.uploadImage(
        file,
        user,
        contactToUpdate._id,
      );
      await this.contactModel.findByIdAndUpdate(id, { avatar: avatar.url });
    }

    const updatedContact = await this.contactModel
      .findByIdAndUpdate(id, dto, {
        new: true,
      })
      .select('-updatedAt -createdAt');

    return updatedContact;
  }

  async deleteContact(id: string, user): Promise<Contact> {
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
