import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { ContactsModule } from './contacts/contacts.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { getMongoConfig } from './configs/mongodb.config';

@Module({
  imports: [
    UsersModule,
    ContactsModule,
    ConfigModule.forRoot(),
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: getMongoConfig,

      // uri: 'mongodb+srv://maksbud:mO9sjwRUBVWxxrRB@portfolio.gyc47rc.mongodb.net/Phonebook?retryWrites=true&w=majority',
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
