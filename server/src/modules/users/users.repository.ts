import { Injectable, Inject } from '@nestjs/common';
import { Pool } from 'pg';
import { POSTGRES_POOL } from '../../database/postgres.provider';

@Injectable()
export class UsersRepository {
  constructor(@Inject(POSTGRES_POOL) private readonly pool: Pool) {}

  async findByEmail(email: string) {
    const query = 'SELECT * FROM users WHERE email = $1';
    const result = await this.pool.query(query, [email]);
    return result.rows[0];
  }

  async findById(id: number) {
    const query = `SELECT * FROM users WHERE id = $1`;
    const result = await this.pool.query(query, [id]);
    return result.rows[0];
  }

  async create(data: any) {
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

  async updateProfile(id: number, data: any) {
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

  async updatePassword(id: number, hashedPassword: string) {
    const query = 'UPDATE users SET password = $1, updated_at = CURRENT_TIMESTAMP WHERE id = $2';
    await this.pool.query(query, [hashedPassword, id]);
  }
}

