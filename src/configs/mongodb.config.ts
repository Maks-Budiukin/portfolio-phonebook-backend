import { ConfigService } from '@nestjs/config';
import {
  MongooseModuleAsyncOptions,
  MongooseModuleFactoryOptions,
  MongooseModuleOptions,
} from '@nestjs/mongoose';
import { ConnectOptions } from 'mongoose';

export const getMongoConfig = async (
  configService: ConfigService,
): Promise<MongooseModuleFactoryOptions> => {
  return {
    uri: getMongoString(configService),
  };
};

const getMongoString = (configService: ConfigService): string => {
  return (
    'mongodb+srv://' +
    configService.get('MONGO_LOGIN') +
    ':' +
    configService.get('MONGO_PASSWORD') +
    '@' +
    configService.get('MONGO_HOST') +
    '/' +
    configService.get('MONGO_DATABASE') +
    '?' +
    configService.get('MONGO_OPTIONS')
  );
};