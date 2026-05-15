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
        const query = 'SELECT * FROM activities ORDER BY created_at DESC';
        const result = await this.pool.query(query);
        return result.rows;
    }
    async create(data) {
        const { name, description, icon } = data;
        const query = `
      INSERT INTO activities (name, description, icon, created_at)
      VALUES ($1, $2, $3, CURRENT_TIMESTAMP)
      RETURNING *
    `;
        const result = await this.pool.query(query, [name, description, icon]);
        return result.rows[0];
    }
    async update(id, data) {
        const { name, description, icon } = data;
        const query = `
      UPDATE activities 
      SET name = $1, description = $2, icon = $3
      WHERE id = $4
      RETURNING *
    `;
        const result = await this.pool.query(query, [name, description, icon, id]);
        return result.rows[0];
    }
    async delete(id) {
        const query = 'DELETE FROM activities WHERE id = $1';
        await this.pool.query(query, [id]);
        return { message: 'Activity deleted successfully' };
    }
};
exports.ActivitiesRepository = ActivitiesRepository;
exports.ActivitiesRepository = ActivitiesRepository = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, common_1.Inject)(postgres_provider_1.POSTGRES_POOL)),
    __metadata("design:paramtypes", [pg_1.Pool])
], ActivitiesRepository);
//# sourceMappingURL=activities.repository.js.map