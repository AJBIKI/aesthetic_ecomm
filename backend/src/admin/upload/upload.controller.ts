import {
  Controller,
  Post,
  UseGuards,
  UseInterceptors,
  UploadedFile,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { JwtAuthGuard } from '../../common/guards/jwt-auth.guard';
import { v2 as cloudinary } from 'cloudinary';
import env from '../../config/env';

const { CLOUDINARY_CLOUD_NAME, CLOUDINARY_API_KEY, CLOUDINARY_API_SECRET } = env();
cloudinary.config({
  cloud_name: CLOUDINARY_CLOUD_NAME,
  api_key: CLOUDINARY_API_KEY,
  api_secret: CLOUDINARY_API_SECRET,
});

@UseGuards(JwtAuthGuard)
@Controller('admin/upload')
export class AdminUploadController {
  @Post()
  @UseInterceptors(FileInterceptor('file'))
  async upload(@UploadedFile() file: any) {
    return new Promise((resolve, reject) => {
      const uploadStream = cloudinary.uploader.upload_stream(
        { folder: 'the-monsoon-club', resource_type: 'image' },
        (error, result) => {
          if (error) return reject(error);
          resolve({ url: result?.secure_url, publicId: result?.public_id });
        },
      );
      uploadStream.end(file.buffer);
    });
  }
}
