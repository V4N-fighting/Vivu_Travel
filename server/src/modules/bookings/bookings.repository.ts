import { Injectable, Inject } from '@nestjs/common';
import { Pool } from 'pg';
import { POSTGRES_POOL } from '../../database/postgres.provider';

@Injectable()
export class BookingsRepository {
  constructor(@Inject(POSTGRES_POOL) private readonly pool: Pool) {}

  async create(bookingData: any) {
    const {
      userId, tourId, departureDate, 
      adultCount, childCount, totalPrice, 
      note, travelers 
    } = bookingData;
    
    let { departureDateId } = bookingData;

    const client = await this.pool.connect();
    try {
      await client.query('BEGIN'); // Bắt đầu Transaction

      if (!departureDateId && departureDate) {
        // Look up departureDateId
        const dateResult = await client.query('SELECT id FROM tour_departure_dates WHERE tour_id = $1 AND departure_date = $2 LIMIT 1', [tourId, departureDate]);
        if (dateResult.rows.length > 0) {
          departureDateId = dateResult.rows[0].id;
        } else {
          // If no specific date found, just pick any valid for this tour based on slots
          const fallbackDate = await client.query('SELECT id FROM tour_departure_dates WHERE tour_id = $1 AND available_slots >= $2 LIMIT 1', [tourId, adultCount + childCount]);
          if (fallbackDate.rows.length > 0) {
            departureDateId = fallbackDate.rows[0].id;
          } else {
            throw new Error('Not enough slots available');
          }
        }
      } else if (!departureDateId) {
          const fallbackDate = await client.query('SELECT id FROM tour_departure_dates WHERE tour_id = $1 AND available_slots >= $2 LIMIT 1', [tourId, adultCount + childCount]);
          if (fallbackDate.rows.length > 0) {
            departureDateId = fallbackDate.rows[0].id;
          } else {
            throw new Error('Not enough slots available');
          }      
      }

      // 1. Tạo mã đặt chỗ ngẫu nhiên (VD: VV-123456)
      const bookingCode = `VV-${Math.floor(100000 + Math.random() * 900000)}`;

      // 2. Chèn vào bảng bookings
      const bookingQuery = `
        INSERT INTO bookings (booking_code, user_id, tour_id, departure_date_id, adult_count, child_count, total_price, status, note)
        VALUES ($1, $2, $3, $4, $5, $6, $7, 'pending', $8)
        RETURNING *
      `;
      const bookingResult = await client.query(bookingQuery, [
        bookingCode, userId, tourId, departureDateId, adultCount, childCount, totalPrice, note
      ]);
      const booking = bookingResult.rows[0];

      // 3. Chèn danh sách khách hàng (travelers)
      const travelerQuery = `
        INSERT INTO travelers (booking_id, full_name, email, phone, country, address, type)
        VALUES ($1, $2, $3, $4, $5, $6, $7)
      `;
      for (const traveler of travelers) {
        await client.query(travelerQuery, [
          booking.id, traveler.fullName, traveler.email, traveler.phone, 
          traveler.country, traveler.address, traveler.type
        ]);
      }

      // 4. Cập nhật số chỗ còn trống (available_slots) trong bảng tour_departure_dates
      const updateSlotsQuery = `
        UPDATE tour_departure_dates 
        SET available_slots = available_slots - $1 
        WHERE id = $2 AND available_slots >= $1
      `;
      const totalPeople = adultCount + childCount;
      const updateResult = await client.query(updateSlotsQuery, [totalPeople, departureDateId]);

      if (updateResult.rowCount === 0) {
        throw new Error('Not enough slots available');
      }

      await client.query('COMMIT'); // Hoàn tất giao dịch
      return booking;
    } catch (error) {
      await client.query('ROLLBACK'); // Hoàn tác nếu có lỗi
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
