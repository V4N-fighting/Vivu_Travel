import { Controller, Get, Post, Put, Delete, Body, Param, ParseIntPipe, UseGuards, UseInterceptors, UploadedFiles } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { RolesGuard } from '../auth/roles.guard';
import { Roles } from '../auth/roles.decorator';
import { BannersService } from './banners.service';
import { FileFieldsInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { extname } from 'path';

@Controller('banners')
export class BannersController {
  constructor(private readonly bannersService: BannersService) {}

  @Get()
  async findActive() {
    return this.bannersService.findActive();
  }

  @Get('all')
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Roles('admin')
  async findAll() {
    return this.bannersService.findAll();
  }

  @Post()
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Roles('admin')
  @UseInterceptors(FileFieldsInterceptor([
    { name: 'firstImage', maxCount: 1 },
    { name: 'secondImage', maxCount: 1 },
  ], {
    storage: diskStorage({
      destination: './uploads/banners',
      filename: (req, file, cb) => {
        const randomName = Array(32).fill(null).map(() => (Math.round(Math.random() * 16)).toString(16)).join('');
        return cb(null, `${randomName}${extname(file.originalname)}`);
      },
    }),
  }))
  async create(@Body() data: any, @UploadedFiles() files: { firstImage?: Express.Multer.File[], secondImage?: Express.Multer.File[] }) {
    console.log('--- BANNER CREATE DEBUG ---');
    console.log('Body data:', data);
    console.log('Uploaded files:', files);

    const firstImage = files.firstImage ? files.firstImage[0].filename : (data.firstImage || null);
    const secondImage = files.secondImage ? files.secondImage[0].filename : (data.secondImage || null);

    console.log('Resolved firstImage:', firstImage);

    if (!firstImage) {
      console.error('ERROR: firstImage is missing!');
    }

    const bannerData = {
      ...data,
      firstImage,
      secondImage,
    };
    return this.bannersService.create(bannerData);
  }

  @Put(':id')
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Roles('admin')
  @UseInterceptors(FileFieldsInterceptor([
    { name: 'firstImage', maxCount: 1 },
    { name: 'secondImage', maxCount: 1 },
  ], {
    storage: diskStorage({
      destination: './uploads/banners',
      filename: (req, file, cb) => {
        const randomName = Array(32).fill(null).map(() => (Math.round(Math.random() * 16)).toString(16)).join('');
        return cb(null, `${randomName}${extname(file.originalname)}`);
      },
    }),
  }))
  async update(
    @Param('id', ParseIntPipe) id: number, 
    @Body() data: any,
    @UploadedFiles() files: { firstImage?: Express.Multer.File[], secondImage?: Express.Multer.File[] }
  ) {
    const bannerData = {
      ...data,
      firstImage: files.firstImage ? files.firstImage[0].filename : data.firstImage,
      secondImage: files.secondImage ? files.secondImage[0].filename : data.secondImage,
      isActive: data.is_active === 'true' || data.is_active === true
    };
    return this.bannersService.update(id, bannerData);
  }

  @Delete(':id')
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Roles('admin')
  async delete(@Param('id', ParseIntPipe) id: number) {
    return this.bannersService.delete(id);
  }
}
