import { Injectable, Inject } from '@nestjs/common';
import { Pool } from 'pg';
import { POSTGRES_POOL } from '../../database/postgres.provider';

@Injectable()
export class ReviewsRepository {
  constructor(@Inject(POSTGRES_POOL) private readonly pool: Pool) {}

  async findByTour(tourId: number) {
    const query = `
      SELECT r.*, u.first_name, u.last_name, u.avatar as user_avatar
      FROM reviews r
      LEFT JOIN users u ON r.user_id = u.id
      WHERE r.tour_id = $1
      ORDER BY r.created_at DESC
    `;
    const result = await this.pool.query(query, [tourId]);
    // Client side combine first_name and last_name if needed
    return result.rows.map(row => ({
      ...row,
      user_name: row.first_name ? `${row.first_name} ${row.last_name}` : "Khách hàng ẩn danh"
    }));
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

  async create(data: any) {
    const { userId, tourId, bookingId, rating, comment } = data;
    const query = `
      INSERT INTO reviews (user_id, tour_id, booking_id, rating, comment)
      VALUES ($1, $2, $3, $4, $5)
      RETURNING *
    `;
    const result = await this.pool.query(query, [userId, tourId, bookingId, rating, comment]);
    return result.rows[0];
  }

  async updateAdminReply(id: number, reply: string) {
    const query = 'UPDATE reviews SET admin_reply = $1, replied_at = CURRENT_TIMESTAMP WHERE id = $2 RETURNING *';
    const result = await this.pool.query(query, [reply, id]);
    return result.rows[0];
  }
}
