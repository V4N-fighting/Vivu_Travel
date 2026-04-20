import { ContactsRepository } from './contacts.repository';
export declare class ContactsService {
    private readonly contactsRepository;
    constructor(contactsRepository: ContactsRepository);
    create(contactData: any): Promise<any>;
    findAll(): Promise<any[]>;
}
