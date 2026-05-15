import { ContactsService } from './contacts.service';
export declare class ContactsController {
    private readonly contactsService;
    constructor(contactsService: ContactsService);
    create(contactData: any): Promise<any>;
    findAll(): Promise<any[]>;
    reply(id: string, replyData: {
        message: string;
    }): Promise<{
        success: boolean;
        message: string;
    }>;
}
