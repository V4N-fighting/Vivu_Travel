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
    const query = `SELECT id, first_name as "firstName", last_name as "lastName", email, avatar, role FROM users WHERE id = $1`;
    const result = await this.pool.query(query, [id]);
    return result.rows[0];
  }

  async create(userData: any) {
    const { firstName, lastName, email, password, role } = userData;
    const query = `
      INSERT INTO users (first_name, last_name, email, password, role)
      VALUES ($1, $2, $3, $4, $5)
      RETURNING id, first_name as "firstName", last_name as "lastName", email, role
    `;
    const result = await this.pool.query(query, [
      firstName,
      lastName,
      email,
      password,
      role || 'customer',
    ]);
    return result.rows[0];
  }

  async update(id: number, userData: any) {
    const { firstName, lastName, email, avatar } = userData;
    const query = `
      UPDATE users 
      SET first_name = COALESCE($1, first_name), 
          last_name = COALESCE($2, last_name), 
          email = COALESCE($3, email),
          avatar = COALESCE($4, avatar),
          updated_at = CURRENT_TIMESTAMP
      WHERE id = $5
      RETURNING id, first_name as "firstName", last_name as "lastName", email, avatar, role
    `;
    const result = await this.pool.query(query, [firstName, lastName, email, avatar, id]);
    return result.rows[0];
  }

  async updatePassword(id: number, hashedPassword: string) {
    const query = 'UPDATE users SET password = $1, updated_at = CURRENT_TIMESTAMP WHERE id = $2';
    await this.pool.query(query, [hashedPassword, id]);
  }
}

