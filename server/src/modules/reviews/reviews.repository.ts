import { Injectable, Inject } from '@nestjs/common';
import { Pool } from 'pg';
import { POSTGRES_POOL } from '../../database/postgres.provider';

@Injectable()
export class ReviewsRepository {
  constructor(@Inject(POSTGRES_POOL) private readonly pool: Pool) {}

  async findByTour(tourId: number) {
    const query = `
      SELECT r.*, u.first_name as "firstName", u.last_name as "lastName", u.avatar
      FROM reviews r
      JOIN users u ON r.user_id = u.id
      WHERE r.tour_id = $1
      ORDER BY r.created_at DESC
    `;
    const result = await this.pool.query(query, [tourId]);
    return result.rows;
  }

  async findLatest(limit: number = 5) {
    const query = `
      SELECT r.*, u.first_name as "firstName", u.last_name as "lastName", u.avatar,
             t.name as tour_name
      FROM reviews r
      JOIN users u ON r.user_id = u.id
      JOIN tours t ON r.tour_id = t.id
      ORDER BY r.created_at DESC
      LIMIT $1
    `;
    const result = await this.pool.query(query, [limit]);
    return result.rows;
  }

  async create(reviewData: any) {
    const { userId, tourId, rating, comment } = reviewData;
    const query = `
      INSERT INTO reviews (user_id, tour_id, rating, comment)
      VALUES ($1, $2, $3, $4)
      RETURNING *
    `;
    const result = await this.pool.query(query, [userId, tourId, rating, comment]);
    return result.rows[0];
  }
}
