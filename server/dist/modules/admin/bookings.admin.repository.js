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
exports.AdminBookingsRepository = void 0;
const common_1 = require("@nestjs/common");
const pg_1 = require("pg");
const postgres_provider_1 = require("../../database/postgres.provider");
let AdminBookingsRepository = class AdminBookingsRepository {
    constructor(pool) {
        this.pool = pool;
    }
    async findAllBookings() {
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
    async updateBookingStatus(id, status) {
        const query = 'UPDATE bookings SET status = $1, updated_at = CURRENT_TIMESTAMP WHERE id = $2 RETURNING *';
        const result = await this.pool.query(query, [status, id]);
        return result.rows[0];
    }
};
exports.AdminBookingsRepository = AdminBookingsRepository;
exports.AdminBookingsRepository = AdminBookingsRepository = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, common_1.Inject)(postgres_provider_1.POSTGRES_POOL)),
    __metadata("design:paramtypes", [pg_1.Pool])
], AdminBookingsRepository);
//# sourceMappingURL=bookings.admin.repository.js.map