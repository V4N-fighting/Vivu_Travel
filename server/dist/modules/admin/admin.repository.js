"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AdminRepository = void 0;
const common_1 = require("@nestjs/common");
const pg_1 = require("pg");
const postgres_provider_1 = require("../../database/postgres.provider");
let AdminRepository = class AdminRepository {
    constructor(pool) {
        this.pool = pool;
    }
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
};
exports.AdminRepository = AdminRepository;
exports.AdminRepository = AdminRepository = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, common_1.Inject)(postgres_provider_1.POSTGRES_POOL)),
    __metadata("design:paramtypes", [pg_1.Pool])
], AdminRepository);
//# sourceMappingURL=admin.repository.js.map