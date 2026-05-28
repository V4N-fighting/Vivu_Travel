import { Injectable, NotFoundException } from '@nestjs/common';
import { ContactsRepository } from './contacts.repository';
import { EmailService } from '../email/email.service';

@Injectable()
export class ContactsService {
  constructor(
    private readonly contactsRepository: ContactsRepository,
    private readonly emailService: EmailService,
  ) {}

  async create(contactData: any) {
    return this.contactsRepository.create(contactData);
  }

  async findAll() {
    return this.contactsRepository.findAll();
  }

  async reply(id: number, replyMessage: string) {
    const contacts = await this.contactsRepository.findAll();
    const contact = contacts.find(c => c.id === id);
    
    if (!contact) {
      throw new NotFoundException(`Contact with ID ${id} not found`);
    }

    // Gửi email phản hồi
    await this.emailService.sendContactReply(
      contact.email,
      contact.subject,
      contact.message,
      replyMessage
    );

    // Đánh dấu đã phản hồi và đã đọc
    await this.contactsRepository.updateReadStatus(id, true);
    
    return { success: true, message: 'Reply sent successfully' };
  }
}
