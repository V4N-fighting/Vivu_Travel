import { Injectable } from '@nestjs/common';
import { ContactsRepository } from './contacts.repository';

@Injectable()
export class ContactsService {
  constructor(private readonly contactsRepository: ContactsRepository) {}

  async create(contactData: any) {
    return this.contactsRepository.create(contactData);
  }

  async findAll() {
    return this.contactsRepository.findAll();
  }
}
