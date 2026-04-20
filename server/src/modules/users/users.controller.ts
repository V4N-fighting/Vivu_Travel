import { Controller, Get, Put, Param, Body, UseGuards, Request } from '@nestjs/common';
import { UsersService } from './users.service';
import { AuthGuard } from '@nestjs/passport';

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
  async update(@Param('id') id: string, @Body() userData: any) {
    return this.usersService.update(Number(id), userData);
  }
}
