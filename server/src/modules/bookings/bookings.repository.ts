import { Injectable, Inject } from '@nestjs/common';
import { Pool } from 'pg';
import { POSTGRES_POOL } from '../../database/postgres.provider';

@Injectable()
export class BookingsRepository {
  constructor(@Inject(POSTGRES_POOL) private readonly pool: Pool) {}

  async create(bookingData: any) {
    const {
      userId, tourId, departureDateId, 
      adultCount, childCount, totalPrice, 
      note, travelers 
    } = bookingData;

    const totalPeople = (adultCount || 0) + (childCount || 0);
    const client = await this.pool.connect();

    try {
      await client.query('BEGIN');

      // 1. Kiểm tra số chỗ trống khả dụng và khóa dòng (Select for update)
      const slotQuery = 'SELECT available_slots FROM tour_departure_dates WHERE id = $1 FOR UPDATE';
      const slotRes = await client.query(slotQuery, [departureDateId]);
      
      if (slotRes.rows.length === 0) {
        throw new Error('Ngày khởi hành không tồn tại');
      }

      const availableSlots = slotRes.rows[0].available_slots;
      if (availableSlots < totalPeople) {
        throw new Error(`Không đủ chỗ trống. Chỉ còn ${availableSlots} chỗ.`);
      }

      // 2. Tạo mã đặt chỗ ngẫu nhiên
      const bookingCode = `VV-${Math.floor(100000 + Math.random() * 900000)}`;

      // 3. Chèn vào bảng bookings
      const bookingQuery = `
        INSERT INTO bookings (booking_code, user_id, tour_id, departure_date_id, adult_count, child_count, total_price, note, status)
        VALUES ($1, $2, $3, $4, $5, $6, $7, $8, 'confirmed')
        RETURNING *
      `;
      const bookingRes = await client.query(bookingQuery, [
        bookingCode, userId, tourId, departureDateId, adultCount, childCount, totalPrice, note
      ]);
      const booking = bookingRes.rows[0];

      // 4. Chèn danh sách khách hàng (travelers)
      if (travelers && travelers.length > 0) {
        for (const traveler of travelers) {
          await client.query(
            `INSERT INTO travelers (booking_id, full_name, email, phone, country, address, type) 
             VALUES ($1, $2, $3, $4, $5, $6, $7)`,
            [booking.id, traveler.fullName, traveler.email, traveler.phone, traveler.country, traveler.address, traveler.type]
          );
        }
      }

      // 5. Cập nhật giảm slot trống
      await client.query(
        'UPDATE tour_departure_dates SET available_slots = available_slots - $1 WHERE id = $2',
        [totalPeople, departureDateId]
      );

      await client.query('COMMIT');
      return booking;
    } catch (error) {
      await client.query('ROLLBACK');
      throw error;
    } finally {
      client.release();
    }
  }

  async findByUser(userId: number) {
    const query = `
      SELECT b.*, t.name as tour_name, d.departure_date 
      FROM bookings b
      JOIN tours t ON b.tour_id = t.id
      JOIN tour_departure_dates d ON b.departure_date_id = d.id
      WHERE b.user_id = $1
      ORDER BY b.created_at DESC
    `;
    const result = await this.pool.query(query, [userId]);
    return result.rows;
  }

  async findById(id: number) {
    const query = `
      SELECT b.*, t.name as tour_name, d.departure_date 
      FROM bookings b
      JOIN tours t ON b.tour_id = t.id
      JOIN tour_departure_dates d ON b.departure_date_id = d.id
      WHERE b.id = $1
    `;
    const bookingResult = await this.pool.query(query, [id]);
    const booking = bookingResult.rows[0];

    if (booking) {
      const travelersQuery = 'SELECT * FROM travelers WHERE booking_id = $1';
      const travelersResult = await this.pool.query(travelersQuery, [id]);
      booking.travelers = travelersResult.rows;
    }

    return booking;
  }
}
