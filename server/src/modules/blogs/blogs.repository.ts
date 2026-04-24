import { Injectable, Inject } from '@nestjs/common';
import { Pool } from 'pg';
import { POSTGRES_POOL } from '../../database/postgres.provider';

@Injectable()
export class BlogsRepository {
  constructor(@Inject(POSTGRES_POOL) private readonly pool: Pool) {}

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

  async findById(id: number) {
    const query = 'SELECT * FROM blogs WHERE id = $1';
    const result = await this.pool.query(query, [id]);
    return result.rows[0];
  }

  async create(data: any) {
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

  async update(id: number, data: any) {
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

  async delete(id: number) {
    const query = 'DELETE FROM blogs WHERE id = $1';
    await this.pool.query(query, [id]);
    return { message: 'Blog deleted successfully' };
  }
}
