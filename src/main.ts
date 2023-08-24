declare const module: any;

import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

import { resolve } from 'path';
import { writeFileSync, createWriteStream } from 'fs';
import { get } from 'http';

//Swagger config
const config = new DocumentBuilder()
  .setTitle('Phonebook API')
  .setDescription('Swagger document for Phonebook API')
  .setVersion('1.0')
  .addBearerAuth()
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
  SwaggerModule.setup('/swagger', app, document);

  await app.listen(4000);
  if (module.hot) {
    module.hot.accept();
    module.hot.dispose(() => app.close());
  }

  if (process.env.NODE_ENV === 'development') {
    const serverUrl = 'https://portfolio-phonebook-backend.vercel.app/';
    // write swagger ui files
    get(`${serverUrl}/swagger/swagger-ui-bundle.js`, function (response) {
      response.pipe(createWriteStream('swagger-static/swagger-ui-bundle.js'));
      console.log(
        `Swagger UI bundle file written to: '/swagger-static/swagger-ui-bundle.js'`,
      );
    });

    get(`${serverUrl}/swagger/swagger-ui-init.js`, function (response) {
      response.pipe(createWriteStream('swagger-static/swagger-ui-init.js'));
      console.log(
        `Swagger UI init file written to: '/swagger-static/swagger-ui-init.js'`,
      );
    });

    get(
      `${serverUrl}/swagger/swagger-ui-standalone-preset.js`,
      function (response) {
        response.pipe(
          createWriteStream('swagger-static/swagger-ui-standalone-preset.js'),
        );
        console.log(
          `Swagger UI standalone preset file written to: '/swagger-static/swagger-ui-standalone-preset.js'`,
        );
      },
    );

    get(`${serverUrl}/swagger/swagger-ui.css`, function (response) {
      response.pipe(createWriteStream('swagger-static/swagger-ui.css'));
      console.log(
        `Swagger UI css file written to: '/swagger-static/swagger-ui.css'`,
      );
    });
  }
}
bootstrap();
