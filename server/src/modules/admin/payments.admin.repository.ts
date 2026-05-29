import { Injectable, Inject } from '@nestjs/common';
import { Pool } from 'pg';
import { POSTGRES_POOL } from '../../database/postgres.provider';

@Injectable()
export class AdminPaymentsRepository {
  constructor(@Inject(POSTGRES_POOL) private readonly pool: Pool) {}

  async findAll() {
    const query = `
      SELECT 
        p.*,
        b.booking_code,
        b.status as booking_status,
        b.total_price as booking_total,
        b.adult_count,
        b.child_count,
        t.name as tour_name,
        u.first_name || ' ' || u.last_name as customer_name,
        u.email as customer_email,
        u.phone as customer_phone
      FROM payments p
      JOIN bookings b ON p.booking_id = b.id
      JOIN tours t ON b.tour_id = t.id
      LEFT JOIN users u ON b.user_id = u.id
      ORDER BY p.created_at DESC
    `;
    const result = await this.pool.query(query);
    return result.rows;
  }

  async findByBookingId(bookingId: number) {
    const query = `
      SELECT * FROM payments WHERE booking_id = $1 ORDER BY created_at DESC
    `;
    const result = await this.pool.query(query, [bookingId]);
    return result.rows;
  }

  async create(data: {
    bookingId: number;
    amount: number;
    method: string;
    status?: string;
    transactionId?: string;
  }) {
    const query = `
      INSERT INTO payments (booking_id, amount, method, status, transaction_id)
      VALUES ($1, $2, $3, $4, $5)
      RETURNING *
    `;
    const result = await this.pool.query(query, [
      data.bookingId,
      data.amount,
      data.method,
      data.status || 'pending',
      data.transactionId || null,
    ]);
    return result.rows[0];
  }

  async updateStatus(id: number, status: string, transactionId?: string) {
    const query = `
      UPDATE payments 
      SET status = $1, 
          transaction_id = COALESCE($2, transaction_id),
          paid_at = CASE WHEN $1 = 'paid' THEN CURRENT_TIMESTAMP ELSE paid_at END,
          updated_at = CURRENT_TIMESTAMP
      WHERE id = $3
      RETURNING *
    `;
    // payments table may not have updated_at, handle gracefully
    const simpleQuery = `
      UPDATE payments 
      SET status = $1, 
          transaction_id = COALESCE($2, transaction_id),
          paid_at = CASE WHEN $1 = 'paid' THEN CURRENT_TIMESTAMP ELSE paid_at END
      WHERE id = $3
      RETURNING *
    `;
    const result = await this.pool.query(simpleQuery, [status, transactionId || null, id]);
    return result.rows[0];
  }

  async updateMethod(id: number, method: string) {
    const query = `
      UPDATE payments SET method = $1 WHERE id = $2 RETURNING *
    `;
    const result = await this.pool.query(query, [method, id]);
    return result.rows[0];
  }

  async getStats() {
    const query = `
      SELECT 
        COUNT(*) as total_payments,
        SUM(CASE WHEN status = 'paid' THEN amount ELSE 0 END) as total_paid,
        SUM(CASE WHEN status = 'pending' THEN amount ELSE 0 END) as total_pending,
        COUNT(CASE WHEN status = 'paid' THEN 1 END) as paid_count,
        COUNT(CASE WHEN status = 'pending' THEN 1 END) as pending_count,
        COUNT(CASE WHEN status = 'failed' THEN 1 END) as failed_count,
        COUNT(CASE WHEN method = 'cash' THEN 1 END) as cash_count,
        COUNT(CASE WHEN method = 'bank_transfer' THEN 1 END) as bank_transfer_count,
        COUNT(CASE WHEN method = 'momo' THEN 1 END) as momo_count,
        COUNT(CASE WHEN method = 'vnpay' THEN 1 END) as vnpay_count,
        COUNT(CASE WHEN method = 'credit_card' THEN 1 END) as credit_card_count
      FROM payments
    `;
    const result = await this.pool.query(query);
    return result.rows[0];
  }
}
