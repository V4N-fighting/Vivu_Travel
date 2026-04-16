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
exports.ToursRepository = void 0;
const common_1 = require("@nestjs/common");
const pg_1 = require("pg");
const postgres_provider_1 = require("../../database/postgres.provider");
let ToursRepository = class ToursRepository {
    constructor(pool) {
        this.pool = pool;
    }
    async findAll(filters) {
        let query = `
      SELECT t.*, c.name as country_name, tt.name as tour_type_name
      FROM tours t
      LEFT JOIN countries c ON t.country_id = c.id
      LEFT JOIN tour_types tt ON t.tour_type_id = tt.id
      WHERE t.is_active = true
    `;
        const params = [];
        if (filters.countryId) {
            params.push(filters.countryId);
            query += ` AND t.country_id = $${params.length}`;
        }
        query += ` ORDER BY t.created_at DESC`;
        const result = await this.pool.query(query, params);
        return result.rows;
    }
    async findById(id) {
        const query = `
      SELECT t.*, c.name as country_name, tt.name as tour_type_name
      FROM tours t
      LEFT JOIN countries c ON t.country_id = c.id
      LEFT JOIN tour_types tt ON t.tour_type_id = tt.id
      WHERE t.id = $1
    `;
        const tourResult = await this.pool.query(query, [id]);
        const tour = tourResult.rows[0];
        if (tour) {
            const datesQuery = 'SELECT * FROM tour_departure_dates WHERE tour_id = $1';
            const datesResult = await this.pool.query(datesQuery, [id]);
            tour.departure_dates = datesResult.rows;
            const imagesQuery = 'SELECT * FROM tour_images WHERE tour_id = $1 ORDER BY sort_order ASC';
            const imagesResult = await this.pool.query(imagesQuery, [id]);
            tour.images = imagesResult.rows;
            const itineraryQuery = 'SELECT * FROM tour_itineraries WHERE tour_id = $1 ORDER BY day_number ASC';
            const itineraryResult = await this.pool.query(itineraryQuery, [id]);
            tour.itineraries = itineraryResult.rows;
        }
        return tour;
    }
    async create(tourData) {
        const { name, description, image, countryId, tourTypeId, duration, maxPeople, priceAdult, priceChild, adventureLevel, altitude, hotelStar } = tourData;
        const query = `
      INSERT INTO tours (
        name, description, image, country_id, tour_type_id, 
        duration, max_people, price_adult, price_child, 
        adventure_level, altitude, hotel_star
      )
      VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12)
      RETURNING *
    `;
        const result = await this.pool.query(query, [
            name, description, image, countryId, tourTypeId,
            duration, maxPeople, priceAdult, priceChild,
            adventureLevel, altitude, hotelStar
        ]);
        return result.rows[0];
    }
};
exports.ToursRepository = ToursRepository;
exports.ToursRepository = ToursRepository = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, common_1.Inject)(postgres_provider_1.POSTGRES_POOL)),
    __metadata("design:paramtypes", [pg_1.Pool])
], ToursRepository);
//# sourceMappingURL=tours.repository.js.map