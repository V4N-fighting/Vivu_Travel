import { Injectable, Inject } from '@nestjs/common';
import { Pool } from 'pg';
import { POSTGRES_POOL } from '../../database/postgres.provider';

@Injectable()
export class TourTypesRepository {
  constructor(@Inject(POSTGRES_POOL) private readonly pool: Pool) {}
  async findAll() {
    const query = `
      SELECT tt.*, COUNT(t.id) as tour_count 
      FROM tour_types tt
      LEFT JOIN tours t ON tt.id = t.tour_type_id
      GROUP BY tt.id
      ORDER BY tt.name ASC
    `;
    const result = await this.pool.query(query);
    return result.rows;
  }
}
