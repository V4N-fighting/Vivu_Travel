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
exports.CountriesRepository = void 0;
const common_1 = require("@nestjs/common");
const pg_1 = require("pg");
const postgres_provider_1 = require("../../database/postgres.provider");
let CountriesRepository = class CountriesRepository {
    constructor(pool) {
        this.pool = pool;
    }
    async findAll() {
        const query = `
      SELECT c.*, COUNT(t.id) as tour_count 
      FROM countries c
      LEFT JOIN tours t ON c.id = t.country_id
      GROUP BY c.id
      ORDER BY c.name ASC
    `;
        const result = await this.pool.query(query);
        return result.rows;
    }
    async findById(id) {
        const query = 'SELECT * FROM countries WHERE id = $1';
        const result = await this.pool.query(query, [id]);
        return result.rows[0];
    }
    async create(data) {
        const query = 'INSERT INTO countries (name, description, image) VALUES ($1, $2, $3) RETURNING *';
        const result = await this.pool.query(query, [data.name, data.description, data.image]);
        return result.rows[0];
    }
    async update(id, data) {
        const query = `
      UPDATE countries 
      SET name = COALESCE($1, name), 
          description = COALESCE($2, description), 
          image = COALESCE($3, image)
      WHERE id = $4 RETURNING *
    `;
        const result = await this.pool.query(query, [data.name, data.description, data.image, id]);
        return result.rows[0];
    }
    async delete(id) {
        await this.pool.query('DELETE FROM countries WHERE id = $1', [id]);
        return { success: true };
    }
};
exports.CountriesRepository = CountriesRepository;
exports.CountriesRepository = CountriesRepository = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, common_1.Inject)(postgres_provider_1.POSTGRES_POOL)),
    __metadata("design:paramtypes", [pg_1.Pool])
], CountriesRepository);
//# sourceMappingURL=countries.repository.js.map