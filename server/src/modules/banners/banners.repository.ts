import { Injectable, Inject } from '@nestjs/common';
import { Pool } from 'pg';
import { POSTGRES_POOL } from '../../database/postgres.provider';

@Injectable()
export class BannersRepository {
  constructor(@Inject(POSTGRES_POOL) private readonly pool: Pool) {}
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

  async create(data: any) {
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

  async update(id: number, data: any) {
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

  async delete(id: number) {
    const query = 'DELETE FROM banners WHERE id = $1';
    await this.pool.query(query, [id]);
    return { message: 'Banner deleted' };
  }
}
