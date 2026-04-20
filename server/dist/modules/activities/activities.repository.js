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
exports.ActivitiesRepository = void 0;
const common_1 = require("@nestjs/common");
const pg_1 = require("pg");
const postgres_provider_1 = require("../../database/postgres.provider");
let ActivitiesRepository = class ActivitiesRepository {
    constructor(pool) {
        this.pool = pool;
    }
    async findAll() {
        const query = `
      SELECT a.id::text, a.name, COUNT(ta.tour_id)::int as "numberOfTrip"
      FROM activities a
      LEFT JOIN tour_activities ta ON a.id = ta.activity_id
      LEFT JOIN tours t ON ta.tour_id = t.id AND t.is_active = true
      GROUP BY a.id, a.name
      ORDER BY a.name
    `;
        const result = await this.pool.query(query);
        return result.rows;
    }
};
exports.ActivitiesRepository = ActivitiesRepository;
exports.ActivitiesRepository = ActivitiesRepository = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, common_1.Inject)(postgres_provider_1.POSTGRES_POOL)),
    __metadata("design:paramtypes", [pg_1.Pool])
], ActivitiesRepository);
//# sourceMappingURL=activities.repository.js.map