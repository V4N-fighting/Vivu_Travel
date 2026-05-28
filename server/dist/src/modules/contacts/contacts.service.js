"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ContactsService = void 0;
const common_1 = require("@nestjs/common");
const contacts_repository_1 = require("./contacts.repository");
const email_service_1 = require("../email/email.service");
let ContactsService = class ContactsService {
    constructor(contactsRepository, emailService) {
        this.contactsRepository = contactsRepository;
        this.emailService = emailService;
    }
    async create(contactData) {
        return this.contactsRepository.create(contactData);
    }
    async findAll() {
        return this.contactsRepository.findAll();
    }
    async reply(id, replyMessage) {
        const contacts = await this.contactsRepository.findAll();
        const contact = contacts.find(c => c.id === id);
        if (!contact) {
            throw new common_1.NotFoundException(`Contact with ID ${id} not found`);
        }
        await this.emailService.sendContactReply(contact.email, contact.subject, contact.message, replyMessage);
        await this.contactsRepository.updateReadStatus(id, true);
        return { success: true, message: 'Reply sent successfully' };
    }
};
exports.ContactsService = ContactsService;
exports.ContactsService = ContactsService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [contacts_repository_1.ContactsRepository,
        email_service_1.EmailService])
], ContactsService);
//# sourceMappingURL=contacts.service.js.map