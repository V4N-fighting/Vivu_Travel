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
exports.ReviewsRepository = void 0;
const common_1 = require("@nestjs/common");
const pg_1 = require("pg");
const postgres_provider_1 = require("../../database/postgres.provider");
let ReviewsRepository = class ReviewsRepository {
    constructor(pool) {
        this.pool = pool;
    }
    async findByTour(tourId) {
        const query = `
      SELECT r.*, u.first_name as "firstName", u.last_name as "lastName", u.avatar
      FROM reviews r
      JOIN users u ON r.user_id = u.id
      WHERE r.tour_id = $1
      ORDER BY r.created_at DESC
    `;
        const result = await this.pool.query(query, [tourId]);
        return result.rows;
    }
    async findLatest(limit = 5) {
        const query = `
      SELECT r.*, u.first_name as "firstName", u.last_name as "lastName", u.avatar,
             t.name as tour_name
      FROM reviews r
      JOIN users u ON r.user_id = u.id
      JOIN tours t ON r.tour_id = t.id
      ORDER BY r.created_at DESC
      LIMIT $1
    `;
        const result = await this.pool.query(query, [limit]);
        return result.rows;
    }
    async create(reviewData) {
        const { userId, tourId, rating, comment } = reviewData;
        const query = `
      INSERT INTO reviews (user_id, tour_id, rating, comment)
      VALUES ($1, $2, $3, $4)
      RETURNING *
    `;
        const result = await this.pool.query(query, [userId, tourId, rating, comment]);
        return result.rows[0];
    }
};
exports.ReviewsRepository = ReviewsRepository;
exports.ReviewsRepository = ReviewsRepository = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, common_1.Inject)(postgres_provider_1.POSTGRES_POOL)),
    __metadata("design:paramtypes", [pg_1.Pool])
], ReviewsRepository);
//# sourceMappingURL=reviews.repository.js.map