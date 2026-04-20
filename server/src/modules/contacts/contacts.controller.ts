import { Controller, Get, Post, Body } from '@nestjs/common';
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
}
