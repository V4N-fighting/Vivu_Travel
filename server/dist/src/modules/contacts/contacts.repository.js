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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ContactsRepository = void 0;
const common_1 = require("@nestjs/common");
const pg_1 = require("pg");
const postgres_provider_1 = require("../../database/postgres.provider");
let ContactsRepository = class ContactsRepository {
    constructor(pool) {
        this.pool = pool;
    }
    async create(data) {
        const query = `
      INSERT INTO contacts (name, email, phone, subject, message)
      VALUES ($1, $2, $3, $4, $5)
      RETURNING *
    `;
        const result = await this.pool.query(query, [
            data.fullName || data.name,
            data.email,
            data.phone || '',
            data.subject,
            data.message
        ]);
        return result.rows[0];
    }
    async findAll() {
        const result = await this.pool.query('SELECT * FROM contacts ORDER BY created_at DESC');
        return result.rows;
    }
    async updateReadStatus(id, isRead) {
        const query = 'UPDATE contacts SET is_read = $1 WHERE id = $2 RETURNING *';
        const result = await this.pool.query(query, [isRead, id]);
        return result.rows[0];
    }
    async delete(id) {
        const query = 'DELETE FROM contacts WHERE id = $1';
        await this.pool.query(query, [id]);
        return { success: true };
    }
};
exports.ContactsRepository = ContactsRepository;
exports.ContactsRepository = ContactsRepository = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, common_1.Inject)(postgres_provider_1.POSTGRES_POOL)),
    __metadata("design:paramtypes", [pg_1.Pool])
], ContactsRepository);
//# sourceMappingURL=contacts.repository.js.map