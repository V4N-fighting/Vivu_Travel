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
exports.CouponsRepository = void 0;
const common_1 = require("@nestjs/common");
const pg_1 = require("pg");
const postgres_provider_1 = require("../../database/postgres.provider");
let CouponsRepository = class CouponsRepository {
    constructor(pool) {
        this.pool = pool;
    }
    async findByCode(code) {
        const query = `
      SELECT * FROM coupons 
      WHERE code = $1 
      AND is_active = TRUE 
      AND (valid_to IS NULL OR valid_to >= CURRENT_DATE)
      AND (valid_from IS NULL OR valid_from <= CURRENT_DATE)
    `;
        const result = await this.pool.query(query, [code]);
        const coupon = result.rows[0];
        if (!coupon)
            return null;
        if (coupon.usage_limit !== null && coupon.used_count >= coupon.usage_limit) {
            return null;
        }
        return coupon;
    }
    async incrementUsedCount(id) {
        const query = 'UPDATE coupons SET used_count = used_count + 1 WHERE id = $1';
        await this.pool.query(query, [id]);
    }
    async findAll() {
        return (await this.pool.query('SELECT * FROM coupons ORDER BY created_at DESC')).rows;
    }
    async create(data) {
        const query = `
      INSERT INTO coupons (
        code, 
        discount_type, 
        discount_value, 
        valid_from, 
        valid_to, 
        usage_limit,
        is_active,
        min_order_value,
        max_discount_amount
      )
      VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)
      RETURNING *
    `;
        try {
            const result = await this.pool.query(query, [
                data.code,
                data.discountType,
                data.discountValue,
                data.validFrom || new Date(),
                data.validTo,
                data.usageLimit || 100,
                data.is_active !== undefined ? data.is_active : true,
                data.min_order_value || 0,
                data.max_discount_amount || null
            ]);
            return result.rows[0];
        }
        catch (error) {
            console.error('Lỗi Database khi tạo Coupon:', error.message);
            throw error;
        }
    }
    async update(id, data) {
        const query = `
      UPDATE coupons SET
        code = $1,
        discount_type = $2,
        discount_value = $3,
        valid_from = $4,
        valid_to = $5,
        usage_limit = $6,
        is_active = $7,
        min_order_value = $8,
        max_discount_amount = $9
      WHERE id = $10
      RETURNING *
    `;
        try {
            const result = await this.pool.query(query, [
                data.code,
                data.discountType,
                data.discountValue,
                data.validFrom,
                data.validTo,
                data.usageLimit,
                data.is_active,
                data.min_order_value || 0,
                data.max_discount_amount || null,
                id
            ]);
            return result.rows[0];
        }
        catch (error) {
            console.error('Lỗi Database khi cập nhật Coupon:', error.message);
            throw error;
        }
    }
};
exports.CouponsRepository = CouponsRepository;
exports.CouponsRepository = CouponsRepository = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, common_1.Inject)(postgres_provider_1.POSTGRES_POOL)),
    __metadata("design:paramtypes", [pg_1.Pool])
], CouponsRepository);
//# sourceMappingURL=coupons.repository.js.map