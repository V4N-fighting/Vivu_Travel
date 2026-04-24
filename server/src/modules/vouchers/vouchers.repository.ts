import { Injectable, Inject } from '@nestjs/common';
import { Pool } from 'pg';
import { POSTGRES_POOL } from '../../database/postgres.provider';

@Injectable()
export class VouchersRepository {
  constructor(@Inject(POSTGRES_POOL) private readonly pool: Pool) {}

  async findByCode(code: string) {
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

  async incrementUsedCount(id: number) {
    const query = 'UPDATE vouchers SET used_count = used_count + 1 WHERE id = $1';
    await this.pool.query(query, [id]);
  }
}
