import { Injectable, Inject } from '@nestjs/common';
import { Pool } from 'pg';
import { POSTGRES_POOL } from '../../database/postgres.provider';

@Injectable()
export class ContactsRepository {
  constructor(@Inject(POSTGRES_POOL) private readonly pool: Pool) {}

  async create(data: any) {
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

  async updateReadStatus(id: number, isRead: boolean) {
    const query = 'UPDATE contacts SET is_read = $1 WHERE id = $2 RETURNING *';
    const result = await this.pool.query(query, [isRead, id]);
    return result.rows[0];
  }

  async delete(id: number) {
    const query = 'DELETE FROM contacts WHERE id = $1';
    await this.pool.query(query, [id]);
    return { success: true };
  }
}
