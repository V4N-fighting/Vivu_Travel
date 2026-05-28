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
exports.AdminUsersRepository = void 0;
const common_1 = require("@nestjs/common");
const pg_1 = require("pg");
const postgres_provider_1 = require("../../database/postgres.provider");
let AdminUsersRepository = class AdminUsersRepository {
    constructor(pool) {
        this.pool = pool;
    }
    async findAllUsers() {
        const query = `
      SELECT id, first_name, last_name, email, phone, role, is_active, created_at 
      FROM users 
      WHERE role = 'customer'
      ORDER BY created_at DESC
    `;
        const result = await this.pool.query(query);
        return result.rows;
    }
    async toggleUserStatus(id, isActive) {
        const query = 'UPDATE users SET is_active = $1, updated_at = CURRENT_TIMESTAMP WHERE id = $2 RETURNING id, is_active';
        const result = await this.pool.query(query, [isActive, id]);
        return result.rows[0];
    }
};
exports.AdminUsersRepository = AdminUsersRepository;
exports.AdminUsersRepository = AdminUsersRepository = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, common_1.Inject)(postgres_provider_1.POSTGRES_POOL)),
    __metadata("design:paramtypes", [pg_1.Pool])
], AdminUsersRepository);
//# sourceMappingURL=users.admin.repository.js.map