import { Injectable } from '@nestjs/common';
import { FileResponse } from './dto/file-response.dto';
import { path } from 'app-root-path';
import { ensureDir, writeFile } from 'fs-extra';
import * as sharp from 'sharp';
import { MFile } from './mfile.class';

@Injectable()
export class FilesService {
  async saveAvatar(files: MFile[], user): Promise<FileResponse[]> {
    const userFolder = user._id;
    const uploadFolred = `${path}/avatars/${userFolder}`;

    ensureDir(uploadFolred);

    const res: FileResponse[] = [];

    for (let file of files) {
      await writeFile(`${uploadFolred}/${file.originalname}`, file.buffer);
      res.push({
        url: `avatars/${userFolder}/${file.originalname}`,
        name: `${file.originalname}`,
      });
    }

    return res;
  }

  async convertToWebp(file: Buffer): Promise<Buffer> {
    return sharp(file)
      .resize(200, 200, { withoutEnlargement: true })
      .webp()
      .toBuffer();
  }

  async resizeAvatar(file: Buffer): Promise<Buffer[]> {
    const resizedArray = [];

    const x200 = sharp(file)
      .resize(200, 200, {
        withoutEnlargement: true,
      })
      .toBuffer();

    resizedArray.push(x200);

    const x100 = sharp(file)
      .resize(100, 100, {
        withoutEnlargement: true,
      })
      .toBuffer();

    resizedArray.push(x100);

    return resizedArray;
  }
}
