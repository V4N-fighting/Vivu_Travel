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
    async findAll(filters = {}) {
        const { search, minPrice, maxPrice, minDuration, maxDuration, typeId, countryId, activityIds } = filters;
        let query = `
      SELECT t.*, c.name as country_name, tt.name as tour_type_name
      FROM tours t
      LEFT JOIN countries c ON t.country_id = c.id
      LEFT JOIN tour_types tt ON t.tour_type_id = tt.id
      WHERE t.is_active = TRUE
    `;
        const params = [];
        if (search) {
            params.push(`%${search}%`);
            query += ` AND t.name ILIKE $${params.length}`;
        }
        if (minPrice) {
            params.push(minPrice);
        }
        if (filters.minPrice) {
            params.push(filters.minPrice);
            query += ` AND t.price_adult >= $${params.length}`;
        }
        if (filters.maxPrice) {
            params.push(filters.maxPrice);
            query += ` AND t.price_adult <= $${params.length}`;
        }
        query += ` ORDER BY t.created_at DESC`;
        const result = await this.pool.query(query, params);
        const tours = result.rows;
        for (const tour of tours) {
            const datesQuery = 'SELECT departure_date FROM tour_departure_dates WHERE tour_id = $1 AND departure_date >= CURRENT_DATE';
            const datesResult = await this.pool.query(datesQuery, [tour.id]);
            tour.departure_date = datesResult.rows.map(r => r.departure_date);
            const activitiesQuery = 'SELECT activity_id FROM tour_activities WHERE tour_id = $1';
            const activitiesResult = await this.pool.query(activitiesQuery, [tour.id]);
            tour.activityIDs = activitiesResult.rows.map(r => r.activity_id.toString());
            tour.activityNames = [];
            const transportQuery = 'SELECT transportation FROM tour_transportations WHERE tour_id = $1';
            const transportResult = await this.pool.query(transportQuery, [tour.id]);
            tour.transportation = transportResult.rows.map(r => r.transportation);
            tour.type_id = tour.tour_type_id?.toString() || '';
            tour.countryID = tour.country_id?.toString() || '';
            tour.price = {
                adult: tour.price_adult,
                child: tour.price_child
            };
            tour.max_people = tour.max_people;
            tour.adventure_level = tour.adventure_level;
            tour.hotel_star = tour.hotel_star;
        }
        return tours;
    }
    async findOne(id) {
        const tourQuery = `
      SELECT t.*, c.name as country_name, tt.name as tour_type_name
      FROM tours t
      LEFT JOIN countries c ON t.country_id = c.id
      LEFT JOIN tour_types tt ON t.tour_type_id = tt.id
      WHERE t.id = $1
    `;
        const tourResult = await this.pool.query(tourQuery, [id]);
        const tour = tourResult.rows[0];
        if (tour) {
            const images = await this.pool.query('SELECT * FROM tour_images WHERE tour_id = $1', [id]);
            tour.images = images.rows;
            const itinerariesQuery = `
        SELECT ti.*, 
               COALESCE(
                 (SELECT json_agg(id_inner.* ORDER BY id_inner.sort_order)
                  FROM itinerary_details id_inner
                  WHERE id_inner.itinerary_id = ti.id),
                 '[]'
               ) as details
        FROM tour_itineraries ti
        WHERE ti.tour_id = $1
        ORDER BY ti.day_number ASC
      `;
            const itineraries = await this.pool.query(itinerariesQuery, [id]);
            tour.itineraries = itineraries.rows;
            const transportations = await this.pool.query('SELECT * FROM tour_transportations WHERE tour_id = $1', [id]);
            tour.transportations = transportations.rows;
            const dates = await this.pool.query('SELECT * FROM tour_departure_dates WHERE tour_id = $1', [id]);
            tour.departure_dates = dates.rows;
            const activities = await this.pool.query(`
        SELECT a.* FROM activities a
        JOIN tour_activities ta ON a.id = ta.activity_id
        WHERE ta.tour_id = $1
      `, [id]);
            tour.activities = activities.rows;
        }
        return tour;
    }
    async findById(id) {
        const query = `
      SELECT t.*, c.name as country_name, tt.name as tour_type_name
      FROM tours t
      LEFT JOIN countries c ON t.country_id = c.id
      LEFT JOIN tour_types tt ON t.tour_type_id = tt.id
      WHERE t.id = $1
    `;
        const result = await this.pool.query(query, [id]);
        const tour = result.rows[0];
        if (tour) {
            const datesResult = await this.pool.query('SELECT * FROM tour_departure_dates WHERE tour_id = $1', [id]);
            tour.departure_dates = datesResult.rows;
            const imagesResult = await this.pool.query('SELECT * FROM tour_images WHERE tour_id = $1', [id]);
            tour.images = imagesResult.rows;
            const itineraryResult = await this.pool.query('SELECT * FROM tour_itineraries WHERE tour_id = $1 ORDER BY day_number ASC', [id]);
            tour.itineraries = itineraryResult.rows;
            tour.countryID = tour.country_id?.toString() || '';
            tour.price = {
                adult: tour.price_adult,
                child: tour.price_child
            };
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