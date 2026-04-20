import { Injectable, Inject } from '@nestjs/common';
import { Pool } from 'pg';
import { POSTGRES_POOL } from '../../database/postgres.provider';

@Injectable()
export class CountriesRepository {
  constructor(@Inject(POSTGRES_POOL) private readonly pool: Pool) {}
  async findAll() {
    const query = `
      SELECT c.id::text, c.name, 
             array_remove(array_agg(DISTINCT cl.language), NULL) as language,
             COUNT(DISTINCT t.id)::int as "numberOfTrip"
      FROM countries c
      LEFT JOIN country_languages cl ON c.id = cl.country_id
      LEFT JOIN tours t ON c.id = t.country_id AND t.is_active = true
      GROUP BY c.id, c.name
      ORDER BY c.name
    `;
    const result = await this.pool.query(query);
    return result.rows;
  }
}
