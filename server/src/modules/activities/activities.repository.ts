import { Injectable, Inject } from '@nestjs/common';
import { Pool } from 'pg';
import { POSTGRES_POOL } from '../../database/postgres.provider';

@Injectable()
export class ActivitiesRepository {
  constructor(@Inject(POSTGRES_POOL) private readonly pool: Pool) {}

  async findAll() {
    const query = 'SELECT * FROM activities ORDER BY created_at DESC';
    const result = await this.pool.query(query);
    return result.rows;
  }

  async create(data: any) {
    const { name, description, icon } = data;
    const query = `
      INSERT INTO activities (name, description, icon, created_at)
      VALUES ($1, $2, $3, CURRENT_TIMESTAMP)
      RETURNING *
    `;
    const result = await this.pool.query(query, [name, description, icon]);
    return result.rows[0];
  }

  async update(id: number, data: any) {
    const { name, description, icon } = data;
    const query = `
      UPDATE activities 
      SET name = $1, description = $2, icon = $3
      WHERE id = $4
      RETURNING *
    `;
    const result = await this.pool.query(query, [name, description, icon, id]);
    return result.rows[0];
  }

  async delete(id: number) {
    const query = 'DELETE FROM activities WHERE id = $1';
    await this.pool.query(query, [id]);
    return { message: 'Activity deleted successfully' };
  }
}
