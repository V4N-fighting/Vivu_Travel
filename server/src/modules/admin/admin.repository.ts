import { Injectable, Inject } from '@nestjs/common';
import { Pool } from 'pg';
import { POSTGRES_POOL } from '../../database/postgres.provider';

@Injectable()
export class AdminRepository {
  constructor(@Inject(POSTGRES_POOL) private readonly pool: Pool) {}

  getPool() {
    return this.pool;
  }

  async getDashboardStats() {
    const queries = {
      totalRevenue: "SELECT SUM(total_price) FROM bookings WHERE status = 'confirmed'",
      totalBookings: "SELECT COUNT(*) FROM bookings",
      totalTours: "SELECT COUNT(*) FROM tours",
      totalUsers: "SELECT COUNT(*) FROM users WHERE role = 'customer'",
      recentBookings: `
        SELECT b.*, u.email, t.name as tour_name 
        FROM bookings b
        JOIN users u ON b.user_id = u.id
        JOIN tours t ON b.tour_id = t.id
        ORDER BY b.created_at DESC LIMIT 5
      `,
      popularTours: `
        SELECT t.name, COUNT(b.id) as booking_count
        FROM tours t
        JOIN bookings b ON t.id = b.tour_id
        GROUP BY t.id, t.name
        ORDER BY booking_count DESC LIMIT 5
      `,
      revenueByMonth: `
        SELECT 
          TO_CHAR(created_at, 'YYYY-MM') as month,
          SUM(total_price) as revenue
        FROM bookings 
        WHERE status = 'confirmed'
        GROUP BY month
        ORDER BY month DESC
        LIMIT 6
      `,
      bookingStatusCount: `
        SELECT status, COUNT(*) as count 
        FROM bookings 
        GROUP BY status
      `
    };

    const [revenue, bookings, tours, users, recent, popular, monthlyRevenue, statusCounts] = await Promise.all([
      this.pool.query(queries.totalRevenue),
      this.pool.query(queries.totalBookings),
      this.pool.query(queries.totalTours),
      this.pool.query(queries.totalUsers),
      this.pool.query(queries.recentBookings),
      this.pool.query(queries.popularTours),
      this.pool.query(queries.revenueByMonth),
      this.pool.query(queries.bookingStatusCount)
    ]);

    return {
      revenue: parseFloat(revenue.rows[0].sum || 0),
      bookings: parseInt(bookings.rows[0].count),
      tours: parseInt(tours.rows[0].count),
      users: parseInt(users.rows[0].count),
      recentBookings: recent.rows,
      popularTours: popular.rows,
      revenueByMonth: monthlyRevenue.rows,
      statusCounts: statusCounts.rows
    };
  }
}
