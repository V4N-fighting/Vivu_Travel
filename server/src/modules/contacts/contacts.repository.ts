import { Injectable, Inject } from '@nestjs/common';
import { Pool } from 'pg';
import { POSTGRES_POOL } from '../../database/postgres.provider';

@Injectable()
export class ContactsRepository {
  constructor(@Inject(POSTGRES_POOL) private readonly pool: Pool) {}

  async create(contactData: any) {
    const { firstName, lastName, email, phone, message } = contactData;
    const query = `
      INSERT INTO contacts (first_name, last_name, email, phone, message)
      VALUES ($1, $2, $3, $4, $5)
      RETURNING *
    `;
    const result = await this.pool.query(query, [firstName, lastName, email, phone, message]);
    return result.rows[0];
  }

  async findAll() {
    const result = await this.pool.query('SELECT * FROM contacts ORDER BY created_at DESC');
    return result.rows;
  }
}
