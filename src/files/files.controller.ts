import {
  Controller,
  HttpCode,
  Post,
  Req,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { FileResponse } from './dto/file-response.dto';
import { FilesService } from './files.service';
import { JwtAuthGuard } from 'src/users/guards/jwt.guard';
import { Request } from 'express';
import { MFile } from './mfile.class';

@Controller('files')
export class FilesController {
  constructor(private readonly filesService: FilesService) {}
  @Post('upload')
  @HttpCode(200)
  @UseInterceptors(FileInterceptor('files'))
  @UseGuards(JwtAuthGuard)
  async uploadAvatar(
    @UploadedFile() file: Express.Multer.File,
    @Req() request: Request,
  ): Promise<FileResponse[]> {
    const saveArray: MFile[] = [];

    if (file.mimetype.includes('image')) {
      const webPX200 = await this.filesService.convertToWebpX200(file.buffer);
      saveArray.push(
        new MFile({
          originalname: `${file.originalname.split('.')[0]}X200.webp`,
          buffer: webPX200,
        }),
      );

      const webPX100 = await this.filesService.convertToWebpX100(file.buffer);
      saveArray.push(
        new MFile({
          originalname: `${file.originalname.split('.')[0]}X100.webp`,
          buffer: webPX100,
        }),
      );
    }
    return this.filesService.saveAvatar(saveArray, request.user);
  }
}
