import { Controller, Get, Put, Param, Body, UseGuards, Request, UseInterceptors, UploadedFile } from '@nestjs/common';
import { UsersService } from './users.service';
import { AuthGuard } from '@nestjs/passport';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { extname } from 'path';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @UseGuards(AuthGuard('jwt'))
  @Get(':id')
  async findById(@Param('id') id: string) {
    return this.usersService.findById(Number(id));
  }

  @UseGuards(AuthGuard('jwt'))
  @Put(':id')
  @UseInterceptors(FileInterceptor('avatar', {
    storage: diskStorage({
      destination: './uploads/profile',
      filename: (req, file, cb) => {
        const uniqueSuffix = Math.floor(1000 + Math.random() * 9000);
        const originalName = file.originalname.replace(/\s+/g, '-').split('.').slice(0, -1).join('.');
        const extension = extname(file.originalname);
        return cb(null, `profile-${uniqueSuffix}${extension}`);
      }
    })
  }))
  async update(@Param('id') id: string, @Body() userData: any, @UploadedFile() file: Express.Multer.File) {
    if (file) {
      userData.avatar = file.filename;
    }
    return this.usersService.update(Number(id), userData);
  }
}
