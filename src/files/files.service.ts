import { Injectable } from '@nestjs/common';
import { FileResponse } from './dto/file-response.dto';
import { path } from 'app-root-path';
import { ensureDir, writeFile } from 'fs-extra';
import * as sharp from 'sharp';
import { MFile } from './mfile.class';

@Injectable()
export class FilesService {
  // async saveAvatar(files: MFile[], user): Promise<FileResponse[]> {
  //   const userFolder = user._id;
  //   const uploadFolred = `${path}/avatars/${userFolder}`;

  //   ensureDir(uploadFolred);

  //   const res: FileResponse[] = [];

  //   for (let file of files) {
  //     await writeFile(`${uploadFolred}/${file.originalname}`, file.buffer);
  //     res.push({
  //       url: `avatars/${userFolder}/${file.originalname}`,
  //       name: `${file.originalname}`,
  //     });
  //   }

  //   return res;
  // }

  async convertToWebpX500(file: Buffer) {
    return sharp(file)
      .resize(500, 500, { withoutEnlargement: true })
      .webp()
      .toBuffer();
  }
  async convertToWebpX200(file: Buffer) {
    return sharp(file)
      .resize(200, 200, { withoutEnlargement: true })
      .webp()
      .toBuffer();
  }

  async changeContactAvatar(file: MFile, user, contactID: string) {
    const userFolder = user._id;
    const uploadFolred = `${path}/avatars/${userFolder}`;

    ensureDir(uploadFolred);

    const convertedToX500 = await this.convertToWebpX500(file.buffer);
    const convertedToX200 = await this.convertToWebpX200(file.buffer);

    await writeFile(`${uploadFolred}/${contactID}_X500.webp`, convertedToX500);

    await writeFile(`${uploadFolred}/${contactID}_X200.webp`, convertedToX200);

    const response = {
      X500: `avatars/${contactID}_X500.webp`,
      X200: `avatars/${contactID}_X200.webp`,
    };

    return response;
  }
}
