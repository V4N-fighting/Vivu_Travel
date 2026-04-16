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
exports.BookingsRepository = void 0;
const common_1 = require("@nestjs/common");
const pg_1 = require("pg");
const postgres_provider_1 = require("../../database/postgres.provider");
let BookingsRepository = class BookingsRepository {
    constructor(pool) {
        this.pool = pool;
    }
    async create(bookingData) {
        const { userId, tourId, departureDateId, adultCount, childCount, totalPrice, note, travelers } = bookingData;
        const client = await this.pool.connect();
        try {
            await client.query('BEGIN');
            const bookingCode = `VV-${Math.floor(100000 + Math.random() * 900000)}`;
            const bookingQuery = `
        INSERT INTO bookings (booking_code, user_id, tour_id, departure_date_id, adult_count, child_count, total_price, status, note)
        VALUES ($1, $2, $3, $4, $5, $6, $7, 'pending', $8)
        RETURNING *
      `;
            const bookingResult = await client.query(bookingQuery, [
                bookingCode, userId, tourId, departureDateId, adultCount, childCount, totalPrice, note
            ]);
            const booking = bookingResult.rows[0];
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
            await client.query('COMMIT');
            return booking;
        }
        catch (error) {
            await client.query('ROLLBACK');
            throw error;
        }
        finally {
            client.release();
        }
    }
    async findByUser(userId) {
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
    async findById(id) {
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
};
exports.BookingsRepository = BookingsRepository;
exports.BookingsRepository = BookingsRepository = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, common_1.Inject)(postgres_provider_1.POSTGRES_POOL)),
    __metadata("design:paramtypes", [pg_1.Pool])
], BookingsRepository);
//# sourceMappingURL=bookings.repository.js.map