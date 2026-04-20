import { Injectable, Inject } from '@nestjs/common';
import { Pool } from 'pg';
import { POSTGRES_POOL } from '../../database/postgres.provider';

@Injectable()
export class BannersRepository {
  constructor(@Inject(POSTGRES_POOL) private readonly pool: Pool) {}
  async findAll() {
    const query = 'SELECT id, text_content as "textContent", first_image as "firstImage", second_image as "secondImage" FROM banners WHERE is_active = true ORDER BY sort_order ASC';
    const result = await this.pool.query(query);
    return result.rows;
  }
}
