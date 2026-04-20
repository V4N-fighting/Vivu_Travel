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
      SELECT c.id::text, c.name, 
             array_remove(array_agg(DISTINCT cl.language), NULL) as language,
             COUNT(DISTINCT t.id)::int as "numberOfTrip"
      FROM countries c
      LEFT JOIN country_languages cl ON c.id = cl.country_id
      LEFT JOIN tours t ON c.id = t.country_id AND t.is_active = true
      GROUP BY c.id, c.name
      ORDER BY c.name
    `;
        const result = await this.pool.query(query);
        return result.rows;
    }
};
exports.CountriesRepository = CountriesRepository;
exports.CountriesRepository = CountriesRepository = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, common_1.Inject)(postgres_provider_1.POSTGRES_POOL)),
    __metadata("design:paramtypes", [pg_1.Pool])
], CountriesRepository);
//# sourceMappingURL=countries.repository.js.map