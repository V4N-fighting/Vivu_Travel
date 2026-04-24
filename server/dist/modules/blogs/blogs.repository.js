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
exports.BlogsRepository = void 0;
const common_1 = require("@nestjs/common");
const pg_1 = require("pg");
const postgres_provider_1 = require("../../database/postgres.provider");
let BlogsRepository = class BlogsRepository {
    constructor(pool) {
        this.pool = pool;
    }
    async findAll() {
        const query = `
      SELECT b.*, 
             u.first_name || ' ' || u.last_name as author_name 
      FROM blogs b
      LEFT JOIN users u ON b.author_id = u.id
      ORDER BY b.created_at DESC
    `;
        const result = await this.pool.query(query);
        return result.rows;
    }
    async findById(id) {
        const query = 'SELECT * FROM blogs WHERE id = $1';
        const result = await this.pool.query(query, [id]);
        return result.rows[0];
    }
    async create(data) {
        const { title, slug, content, thumbnail, author_id, status } = data;
        const query = `
      INSERT INTO blogs (title, slug, content, thumbnail, author_id, status, published_at, created_at, updated_at)
      VALUES ($1, $2, $3, $4, $5, $6, $7, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP)
      RETURNING *
    `;
        const finalAuthorId = author_id || null;
        const finalStatus = status || 'draft';
        const publishedAt = (finalStatus === 'published') ? new Date() : null;
        const result = await this.pool.query(query, [
            title,
            slug,
            content,
            thumbnail,
            finalAuthorId,
            finalStatus,
            publishedAt
        ]);
        return result.rows[0];
    }
    async update(id, data) {
        const { title, slug, content, thumbnail, status } = data;
        const query = `
      UPDATE blogs 
      SET title = $1, slug = $2, content = $3, thumbnail = $4, status = $5, updated_at = CURRENT_TIMESTAMP
      WHERE id = $6
      RETURNING *
    `;
        const result = await this.pool.query(query, [title, slug, content, thumbnail, status, id]);
        return result.rows[0];
    }
    async delete(id) {
        const query = 'DELETE FROM blogs WHERE id = $1';
        await this.pool.query(query, [id]);
        return { message: 'Blog deleted successfully' };
    }
};
exports.BlogsRepository = BlogsRepository;
exports.BlogsRepository = BlogsRepository = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, common_1.Inject)(postgres_provider_1.POSTGRES_POOL)),
    __metadata("design:paramtypes", [pg_1.Pool])
], BlogsRepository);
//# sourceMappingURL=blogs.repository.js.map