import { Injectable, Inject } from '@nestjs/common';
import { Pool } from 'pg';
import { POSTGRES_POOL } from '../../database/postgres.provider';

@Injectable()
export class CouponsRepository {
  constructor(@Inject(POSTGRES_POOL) private readonly pool: Pool) {}

  async findByCode(code: string) {
    const query = `
      SELECT * FROM coupons 
      WHERE code = $1 
      AND is_active = TRUE 
      AND (valid_to IS NULL OR valid_to >= CURRENT_DATE)
      AND (valid_from IS NULL OR valid_from <= CURRENT_DATE)
    `;
    const result = await this.pool.query(query, [code]);
    const coupon = result.rows[0];

    if (!coupon) return null;

    // Kiểm tra giới hạn sử dụng thủ công để log lỗi chính xác hơn nếu cần
    if (coupon.usage_limit !== null && coupon.used_count >= coupon.usage_limit) {
      return null;
    }

    return coupon;
  }

  async incrementUsedCount(id: number) {
    const query = 'UPDATE coupons SET used_count = used_count + 1 WHERE id = $1';
    await this.pool.query(query, [id]);
  }

  // Dành cho Admin quản lý Coupons
  async findAll() {
    return (await this.pool.query('SELECT * FROM coupons ORDER BY created_at DESC')).rows;
  }

  async create(data: any) {
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
    } catch (error) {
      console.error('Lỗi Database khi tạo Coupon:', error.message);
      throw error;
    }
  }

  async update(id: number, data: any) {
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
    } catch (error) {
      console.error('Lỗi Database khi cập nhật Coupon:', error.message);
      throw error;
    }
  }
}
