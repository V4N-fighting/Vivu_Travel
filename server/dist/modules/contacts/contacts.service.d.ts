import { ContactsRepository } from './contacts.repository';
import { EmailService } from '../email/email.service';
export declare class ContactsService {
    private readonly contactsRepository;
    private readonly emailService;
    constructor(contactsRepository: ContactsRepository, emailService: EmailService);
    create(contactData: any): Promise<any>;
    findAll(): Promise<any[]>;
    reply(id: number, replyMessage: string): Promise<{
        success: boolean;
        message: string;
    }>;
}
