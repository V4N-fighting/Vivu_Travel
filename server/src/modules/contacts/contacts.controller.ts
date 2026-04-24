import { Controller, Get, Post, Body, Param } from '@nestjs/common';
import { ContactsService } from './contacts.service';

@Controller('contacts')
export class ContactsController {
  constructor(private readonly contactsService: ContactsService) {}

  @Post()
  async create(@Body() contactData: any) {
    return this.contactsService.create(contactData);
  }

  @Get()
  async findAll() {
    return this.contactsService.findAll();
  }

  @Post(':id/reply')
  async reply(@Param('id') id: string, @Body() replyData: { message: string }) {
    return this.contactsService.reply(Number(id), replyData.message);
  }
}
