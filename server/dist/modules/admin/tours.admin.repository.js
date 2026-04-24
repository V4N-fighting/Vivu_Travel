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
exports.AdminToursRepository = void 0;
const common_1 = require("@nestjs/common");
const pg_1 = require("pg");
const postgres_provider_1 = require("../../database/postgres.provider");
let AdminToursRepository = class AdminToursRepository {
    constructor(pool) {
        this.pool = pool;
    }
    async createTour(data) {
        const query = `
      INSERT INTO tours (
        name, description, price_adult, price_child, duration, 
        country_id, tour_type_id, max_people, hotel_star, adventure_level, 
        booking_deadline_days, meeting_point
      )
      VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12)
      RETURNING *
    `;
        const result = await this.pool.query(query, [
            data.name,
            data.description,
            data.price_adult,
            data.price_child,
            data.duration,
            data.country_id,
            data.tour_type_id,
            data.max_people || 20,
            data.hotel_star || 3,
            data.adventure_level || 'Moderate',
            data.booking_deadline_days || 0,
            data.meeting_point || ''
        ]);
        return result.rows[0];
    }
    async updateTour(id, data) {
        const query = `
      UPDATE tours SET 
        name = COALESCE($1, name), 
        description = COALESCE($2, description), 
        price_adult = COALESCE($3, price_adult), 
        price_child = COALESCE($4, price_child), 
        duration = COALESCE($5, duration), 
        max_people = COALESCE($6, max_people), 
        hotel_star = COALESCE($7, hotel_star), 
        adventure_level = COALESCE($8, adventure_level),
        booking_deadline_days = COALESCE($9, booking_deadline_days),
        meeting_point = COALESCE($10, meeting_point),
        is_active = COALESCE($11, is_active)
      WHERE id = $12 RETURNING *
    `;
        const result = await this.pool.query(query, [
            data.name || null,
            data.description || null,
            data.price_adult || null,
            data.price_child || null,
            data.duration || null,
            data.max_people || null,
            data.hotel_star || null,
            data.adventure_level || null,
            data.booking_deadline_days !== undefined ? data.booking_deadline_days : null,
            data.meeting_point || null,
            data.is_active !== undefined ? data.is_active : null,
            id
        ]);
        return result.rows[0];
    }
    async deleteTour(id) {
        await this.pool.query('DELETE FROM tours WHERE id = $1', [id]);
        return { success: true };
    }
    async findAll() {
        const query = `
      SELECT t.*, c.name as country_name, tt.name as tour_type_name
      FROM tours t
      LEFT JOIN countries c ON t.country_id = c.id
      LEFT JOIN tour_types tt ON t.tour_type_id = tt.id
      ORDER BY t.created_at DESC
    `;
        const result = await this.pool.query(query);
        return result.rows;
    }
    async addDepartureDate(tourId, data) {
        const query = `
      INSERT INTO tour_departure_dates (tour_id, departure_date, available_slots)
      VALUES ($1, $2, $3) RETURNING *
    `;
        const result = await this.pool.query(query, [tourId, data.departureDate, data.availableSlots]);
        return result.rows[0];
    }
    async getDepartureDates(tourId) {
        const query = 'SELECT * FROM tour_departure_dates WHERE tour_id = $1 ORDER BY departure_date ASC';
        const result = await this.pool.query(query, [tourId]);
        return result.rows;
    }
    async deleteDepartureDate(id) {
        await this.pool.query('DELETE FROM tour_departure_dates WHERE id = $1', [id]);
        return { success: true };
    }
    async addTourImage(tourId, imageUrl, isPrimary = false) {
        const query = `
      INSERT INTO tour_images (tour_id, image_url, is_primary)
      VALUES ($1, $2, $3) RETURNING *
    `;
        const result = await this.pool.query(query, [tourId, imageUrl, isPrimary]);
        return result.rows[0];
    }
    async getTourImages(tourId) {
        const query = 'SELECT * FROM tour_images WHERE tour_id = $1 ORDER BY sort_order ASC, id DESC';
        const result = await this.pool.query(query, [tourId]);
        return result.rows;
    }
    async deleteTourImage(id) {
        await this.pool.query('DELETE FROM tour_images WHERE id = $1', [id]);
        return { success: true };
    }
    async getAllTourTypes() {
        const query = 'SELECT * FROM tour_types ORDER BY name ASC';
        const result = await this.pool.query(query);
        return result.rows;
    }
    async createTourType(data) {
        const query = 'INSERT INTO tour_types (name, description, image) VALUES ($1, $2, $3) RETURNING *';
        const result = await this.pool.query(query, [data.name, data.description, data.image]);
        return result.rows[0];
    }
    async updateTourType(id, data) {
        const query = 'UPDATE tour_types SET name = $1, description = $2, image = $3 WHERE id = $4 RETURNING *';
        const result = await this.pool.query(query, [data.name, data.description, data.image, id]);
        return result.rows[0];
    }
    async deleteTourType(id) {
        await this.pool.query('DELETE FROM tour_types WHERE id = $1', [id]);
        return { success: true };
    }
    async getTourActivities(tourId) {
        const query = `
      SELECT a.* FROM activities a
      JOIN tour_activities ta ON a.id = ta.activity_id
      WHERE ta.tour_id = $1
    `;
        const result = await this.pool.query(query, [tourId]);
        return result.rows;
    }
    async syncTourActivities(tourId, activityIds) {
        await this.pool.query('DELETE FROM tour_activities WHERE tour_id = $1', [tourId]);
        if (activityIds && activityIds.length > 0) {
            const values = activityIds.map(id => `(${tourId}, ${id})`).join(',');
            const query = `INSERT INTO tour_activities (tour_id, activity_id) VALUES ${values}`;
            await this.pool.query(query);
        }
        return { success: true };
    }
};
exports.AdminToursRepository = AdminToursRepository;
exports.AdminToursRepository = AdminToursRepository = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, common_1.Inject)(postgres_provider_1.POSTGRES_POOL)),
    __metadata("design:paramtypes", [pg_1.Pool])
], AdminToursRepository);
//# sourceMappingURL=tours.admin.repository.js.map