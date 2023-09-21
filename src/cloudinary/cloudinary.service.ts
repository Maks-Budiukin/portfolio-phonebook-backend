import { Injectable } from '@nestjs/common';
import { UploadApiErrorResponse, UploadApiResponse, v2 } from 'cloudinary';
import toStream = require('buffer-to-stream');

@Injectable()
export class CloudinaryService {
  async uploadImage(
    file: Express.Multer.File,
    user,
    contactID: string,
  ): Promise<UploadApiResponse | UploadApiErrorResponse> {
    return new Promise((resolve, reject) => {
      const upload = v2.uploader.upload_stream(
        {
          folder: `pb_avatars/${user._id}`,
          public_id: contactID,
          gravity: 'face',
          height: 400,
          width: 400,
          crop: 'thumb',
          zoom: '0.5',
        },
        (error, result) => {
          if (error) return reject(error);
          resolve(result);
          console.log('RESULT', result);
        },
      );

      toStream(file.buffer).pipe(upload);
    });
  }

  async uploadCropped(file: Express.Multer.File) {
    console.log('INCOMING FILE', file);
    const streamed = toStream(file.buffer);
    console.log('STREAMED', streamed);
    v2.uploader
      .upload(file.originalname)
      .then((result) => console.log('RESULT', result));
  }
}
