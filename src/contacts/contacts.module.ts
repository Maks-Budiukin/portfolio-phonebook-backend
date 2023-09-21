import { Module } from '@nestjs/common';
import { ContactsController } from './contacts.controller';
import { ContactsService } from './contacts.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Contact, ContactSchema } from './contacts.model';
import { CloudinaryModule } from 'src/cloudinary/cloudinary.module';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: Contact.name,
        schema: ContactSchema,
      },
    ]),
    CloudinaryModule,
  ],
  controllers: [ContactsController],
  providers: [ContactsService],
})
export class ContactsModule {}
