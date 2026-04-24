import { Injectable, Inject } from '@nestjs/common';
import { Pool } from 'pg';
import { POSTGRES_POOL } from '../../database/postgres.provider';

@Injectable()
export class CountriesRepository {
  constructor(@Inject(POSTGRES_POOL) private readonly pool: Pool) {}
  async findAll() {
    const query = `
      SELECT c.*, COUNT(t.id) as tour_count 
      FROM countries c
      LEFT JOIN tours t ON c.id = t.country_id
      GROUP BY c.id
      ORDER BY c.name ASC
    `;
    const result = await this.pool.query(query);
    return result.rows;
  }

  async findById(id: number) {
    const query = 'SELECT * FROM countries WHERE id = $1';
    const result = await this.pool.query(query, [id]);
    return result.rows[0];
  }

  // Admin methods
  async create(data: any) {
    const query = 'INSERT INTO countries (name, description, image) VALUES ($1, $2, $3) RETURNING *';
    const result = await this.pool.query(query, [data.name, data.description, data.image]);
    return result.rows[0];
  }

  async update(id: number, data: any) {
    const query = `
      UPDATE countries 
      SET name = COALESCE($1, name), 
          description = COALESCE($2, description), 
          image = COALESCE($3, image)
      WHERE id = $4 RETURNING *
    `;
    const result = await this.pool.query(query, [data.name, data.description, data.image, id]);
    return result.rows[0];
  }

  async delete(id: number) {
    await this.pool.query('DELETE FROM countries WHERE id = $1', [id]);
    return { success: true };
  }
}
