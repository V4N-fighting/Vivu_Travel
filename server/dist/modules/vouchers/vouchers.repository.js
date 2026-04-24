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
exports.VouchersRepository = void 0;
const common_1 = require("@nestjs/common");
const pg_1 = require("pg");
const postgres_provider_1 = require("../../database/postgres.provider");
let VouchersRepository = class VouchersRepository {
    constructor(pool) {
        this.pool = pool;
    }
    async findByCode(code) {
        const query = `
      SELECT * FROM vouchers 
      WHERE code = $1 
      AND is_active = TRUE 
      AND expiry_date > CURRENT_TIMESTAMP 
      AND used_count < usage_limit
    `;
        const result = await this.pool.query(query, [code]);
        return result.rows[0];
    }
    async incrementUsedCount(id) {
        const query = 'UPDATE vouchers SET used_count = used_count + 1 WHERE id = $1';
        await this.pool.query(query, [id]);
    }
};
exports.VouchersRepository = VouchersRepository;
exports.VouchersRepository = VouchersRepository = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, common_1.Inject)(postgres_provider_1.POSTGRES_POOL)),
    __metadata("design:paramtypes", [pg_1.Pool])
], VouchersRepository);
//# sourceMappingURL=vouchers.repository.js.map