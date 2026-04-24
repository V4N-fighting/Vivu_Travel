import { Injectable, Inject } from '@nestjs/common';
import { Pool } from 'pg';
import { POSTGRES_POOL } from '../../database/postgres.provider';

@Injectable()
export class AdminUsersRepository {
  constructor(@Inject(POSTGRES_POOL) private readonly pool: Pool) {}

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

  async toggleUserStatus(id: number, isActive: boolean) {
    const query = 'UPDATE users SET is_active = $1, updated_at = CURRENT_TIMESTAMP WHERE id = $2 RETURNING id, is_active';
    const result = await this.pool.query(query, [isActive, id]);
    return result.rows[0];
  }
}
