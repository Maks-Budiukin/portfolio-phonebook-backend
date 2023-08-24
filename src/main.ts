declare const module: any;

import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

//Swagger config
const config = new DocumentBuilder()
  .setTitle('Phonebook API')
  .setDescription('Swagger document for Phonebook API')
  .setVersion('1.0')
  .addBearerAuth()
  .addServer('https://portfolio-phonebook-backend.vercel.app/')
  .build();

// const options = {
//   definition: {
//     openapi: '3.0.0',
//     info: {
//       title: 'Library API',
//       version: '1.0.0',
//       description: 'A simple Express Library API',
//       termsOfService: 'http://example.com/terms/',
//       contact: {
//         name: 'API Support',
//         url: 'http://www.exmaple.com/support',
//         email: 'support@example.com',
//       },
//     },
//     servers: [
//       {
//         url: 'https://portfolio-phonebook-backend.vercel.app/',
//         description: 'My API Documentation',
//       },
//     ],
//   },
//   // This is to call all the file
//   apis: ['src/**/*.js'],
// };

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix('api');
  app.useGlobalPipes(
    new ValidationPipe({ whitelist: true, forbidNonWhitelisted: true }),
  );
  //Swagger
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup(
    'https://portfolio-phonebook-backend.vercel.app/api',
    app,
    document,
  );

  await app.listen(4000);
  if (module.hot) {
    module.hot.accept();
    module.hot.dispose(() => app.close());
  }
}
bootstrap();
