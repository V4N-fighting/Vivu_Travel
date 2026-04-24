import { Injectable, Inject } from '@nestjs/common';
import { Pool } from 'pg';
import { POSTGRES_POOL } from '../../database/postgres.provider';

@Injectable()
export class AdminBookingsRepository {
  constructor(@Inject(POSTGRES_POOL) private readonly pool: Pool) {}

  async findAllBookings() {
    // 1. Lấy danh sách các cặp Tour + Ngày khởi hành có người đặt
    const queryGroups = `
      SELECT DISTINCT 
             t.id as tour_id,
             t.name as tour_name,
             tdd.id as departure_date_id,
             tdd.departure_date,
             (SELECT COUNT(*) FROM bookings b2 WHERE b2.tour_id = t.id AND b2.departure_date_id = tdd.id AND b2.status != 'cancelled') as total_bookings,
             (SELECT SUM(adult_count + child_count) FROM bookings b3 WHERE b3.tour_id = t.id AND b3.departure_date_id = tdd.id AND b3.status != 'cancelled') as total_people
      FROM bookings b
      JOIN tours t ON b.tour_id = t.id
      JOIN tour_departure_dates tdd ON b.departure_date_id = tdd.id
      ORDER BY tdd.departure_date DESC
    `;
    const groupsResult = await this.pool.query(queryGroups);
    const groups = groupsResult.rows;

    // 2. Với mỗi nhóm, lấy chi tiết các khách hàng đã đặt
    for (const group of groups) {
      const queryDetails = `
        SELECT b.*, 
               u.first_name || ' ' || u.last_name as customer_name,
               u.email as customer_email,
               u.phone as customer_phone
        FROM bookings b
        LEFT JOIN users u ON b.user_id = u.id
        WHERE b.tour_id = $1 AND b.departure_date_id = $2
        ORDER BY b.created_at DESC
      `;
      const detailsResult = await this.pool.query(queryDetails, [group.tour_id, group.departure_date_id]);
      group.bookings = detailsResult.rows;
    }

    return groups;
  }

  async updateBookingStatus(id: number, status: string) {
    const query = 'UPDATE bookings SET status = $1, updated_at = CURRENT_TIMESTAMP WHERE id = $2 RETURNING *';
    const result = await this.pool.query(query, [status, id]);
    return result.rows[0];
  }
}
