import { Injectable, Inject } from '@nestjs/common';
import { Pool } from 'pg';
import { POSTGRES_POOL } from '../../database/postgres.provider';

@Injectable()
export class ActivitiesRepository {
  constructor(@Inject(POSTGRES_POOL) private readonly pool: Pool) {}
  async findAll() {
    const query = `
      SELECT a.id::text, a.name, COUNT(ta.tour_id)::int as "numberOfTrip"
      FROM activities a
      LEFT JOIN tour_activities ta ON a.id = ta.activity_id
      LEFT JOIN tours t ON ta.tour_id = t.id AND t.is_active = true
      GROUP BY a.id, a.name
      ORDER BY a.name
    `;
    const result = await this.pool.query(query);
    return result.rows;
  }
}
