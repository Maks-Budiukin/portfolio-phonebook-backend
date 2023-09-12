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

  async convertToWebpX200(file: Buffer): Promise<Buffer> {
    return sharp(file)
      .resize(200, 200, { withoutEnlargement: true })
      .webp()
      .toBuffer();
  }

  async convertToWebpX100(file: Buffer): Promise<Buffer> {
    return sharp(file)
      .resize(100, 100, { withoutEnlargement: true })
      .webp()
      .toBuffer();
  }
}
