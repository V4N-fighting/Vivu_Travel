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
exports.UsersRepository = void 0;
const common_1 = require("@nestjs/common");
const pg_1 = require("pg");
const postgres_provider_1 = require("../../database/postgres.provider");
let UsersRepository = class UsersRepository {
    constructor(pool) {
        this.pool = pool;
    }
    async findByEmail(email) {
        const query = 'SELECT * FROM users WHERE email = $1';
        const result = await this.pool.query(query, [email]);
        return result.rows[0];
    }
    async findById(id) {
        const query = `SELECT * FROM users WHERE id = $1`;
        const result = await this.pool.query(query, [id]);
        return result.rows[0];
    }
    async create(data) {
        const { firstName, lastName, email, password, phone, role } = data;
        const query = `
      INSERT INTO users (first_name, last_name, email, password, phone, role, is_active)
      VALUES ($1, $2, $3, $4, $5, $6, $7)
      RETURNING *
    `;
        const result = await this.pool.query(query, [
            firstName,
            lastName,
            email,
            password,
            phone,
            role || 'customer',
            true
        ]);
        return result.rows[0];
    }
    async updateProfile(id, data) {
        const { firstName, lastName, phone, address, avatar } = data;
        const query = `
      UPDATE users 
      SET first_name = COALESCE($1, first_name), 
          last_name = COALESCE($2, last_name), 
          phone = COALESCE($3, phone), 
          address = COALESCE($4, address), 
          avatar = COALESCE($5, avatar), 
          updated_at = CURRENT_TIMESTAMP
      WHERE id = $6
      RETURNING *
    `;
        const result = await this.pool.query(query, [
            firstName, lastName, phone, address, avatar, id
        ]);
        return result.rows[0];
    }
    async updatePassword(id, hashedPassword) {
        const query = 'UPDATE users SET password = $1, updated_at = CURRENT_TIMESTAMP WHERE id = $2';
        await this.pool.query(query, [hashedPassword, id]);
    }
};
exports.UsersRepository = UsersRepository;
exports.UsersRepository = UsersRepository = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, common_1.Inject)(postgres_provider_1.POSTGRES_POOL)),
    __metadata("design:paramtypes", [pg_1.Pool])
], UsersRepository);
//# sourceMappingURL=users.repository.js.map