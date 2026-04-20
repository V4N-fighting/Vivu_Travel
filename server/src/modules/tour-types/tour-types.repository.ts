import { Injectable, Inject } from '@nestjs/common';
import { Pool } from 'pg';
import { POSTGRES_POOL } from '../../database/postgres.provider';

@Injectable()
export class TourTypesRepository {
  constructor(@Inject(POSTGRES_POOL) private readonly pool: Pool) {}
  async findAll() {
    const query = `
      SELECT tt.id::text, tt.name, COUNT(t.id)::int as "numberOfTrip"
      FROM tour_types tt
      LEFT JOIN tours t ON tt.id = t.tour_type_id AND t.is_active = true
      GROUP BY tt.id, tt.name
      ORDER BY tt.name
    `;
    const result = await this.pool.query(query);
    return result.rows;
  }
}
