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
exports.BannersRepository = void 0;
const common_1 = require("@nestjs/common");
const pg_1 = require("pg");
const postgres_provider_1 = require("../../database/postgres.provider");
let BannersRepository = class BannersRepository {
    constructor(pool) {
        this.pool = pool;
    }
    async findAll() {
        const query = 'SELECT id, text_content as "textContent", first_image as "firstImage", second_image as "secondImage", is_active as "isActive", sort_order as "sortOrder" FROM banners ORDER BY sort_order ASC';
        const result = await this.pool.query(query);
        return result.rows;
    }
    async findActive() {
        const query = 'SELECT id, text_content as "textContent", first_image as "firstImage", second_image as "secondImage" FROM banners WHERE is_active = true ORDER BY sort_order ASC';
        const result = await this.pool.query(query);
        return result.rows;
    }
    async create(data) {
        const { textContent, firstImage, secondImage, sortOrder, page_location } = data;
        const query = `
      INSERT INTO banners (text_content, first_image, second_image, sort_order, page_location)
      VALUES ($1, $2, $3, $4, $5)
      RETURNING id, text_content as "textContent"
    `;
        const result = await this.pool.query(query, [
            textContent,
            firstImage || '',
            secondImage || '',
            sortOrder || 0,
            page_location || 'home'
        ]);
        return result.rows[0];
    }
    async update(id, data) {
        const { textContent, firstImage, secondImage, sortOrder, isActive, page_location } = data;
        const query = `
      UPDATE banners 
      SET text_content = $1, first_image = $2, second_image = $3, sort_order = $4, is_active = $5, page_location = $6
      WHERE id = $7
      RETURNING *
    `;
        const result = await this.pool.query(query, [
            textContent,
            firstImage || '',
            secondImage || '',
            sortOrder,
            isActive,
            page_location || 'home',
            id
        ]);
        return result.rows[0];
    }
    async delete(id) {
        const query = 'DELETE FROM banners WHERE id = $1';
        await this.pool.query(query, [id]);
        return { message: 'Banner deleted' };
    }
};
exports.BannersRepository = BannersRepository;
exports.BannersRepository = BannersRepository = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, common_1.Inject)(postgres_provider_1.POSTGRES_POOL)),
    __metadata("design:paramtypes", [pg_1.Pool])
], BannersRepository);
//# sourceMappingURL=banners.repository.js.map