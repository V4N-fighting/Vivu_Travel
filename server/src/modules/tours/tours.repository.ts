import { Injectable, Inject } from '@nestjs/common';
import { Pool } from 'pg';
import { POSTGRES_POOL } from '../../database/postgres.provider';

@Injectable()
export class ToursRepository {
  constructor(@Inject(POSTGRES_POOL) private readonly pool: Pool) {}

  async findAll(filters: any) {
    let query = `
      SELECT t.*, c.name as country_name, tt.name as tour_type_name
      FROM tours t
      LEFT JOIN countries c ON t.country_id = c.id
      LEFT JOIN tour_types tt ON t.tour_type_id = tt.id
      WHERE t.is_active = true
    `;
    const params = [];

    if (filters.search) {
      params.push(`%${filters.search}%`);
      query += ` AND t.name ILIKE $${params.length}`;
    }

    if (filters.countryId) {
      params.push(filters.countryId);
      query += ` AND t.country_id = $${params.length}`;
    }

    if (filters.minPrice) {
      params.push(filters.minPrice);
      query += ` AND t.price_adult >= $${params.length}`;
    }

    if (filters.maxPrice) {
      params.push(filters.maxPrice);
      query += ` AND t.price_adult <= $${params.length}`;
    }

    query += ` ORDER BY t.created_at DESC`;

    const result = await this.pool.query(query, params);
    
    // Lấy thêm departure_dates cho từng tour trong danh sách
    const tours = result.rows;
    for (const tour of tours) {
      const datesQuery = 'SELECT * FROM tour_departure_dates WHERE tour_id = $1 AND departure_date >= CURRENT_DATE';
      const datesResult = await this.pool.query(datesQuery, [tour.id]);
      tour.departure_dates = datesResult.rows;
    }

    return tours;
  }

  async findById(id: number) {
    const query = `
      SELECT t.*, c.name as country_name, tt.name as tour_type_name
      FROM tours t
      LEFT JOIN countries c ON t.country_id = c.id
      LEFT JOIN tour_types tt ON t.tour_type_id = tt.id
      WHERE t.id = $1
    `;
    
    // Lấy thông tin cơ bản của tour
    const tourResult = await this.pool.query(query, [id]);
    const tour = tourResult.rows[0];

    if (tour) {
      // Lấy thêm ngày khởi hành
      const datesQuery = 'SELECT * FROM tour_departure_dates WHERE tour_id = $1';
      const datesResult = await this.pool.query(datesQuery, [id]);
      tour.departure_dates = datesResult.rows;

      // Lấy thêm hình ảnh
      const imagesQuery = 'SELECT * FROM tour_images WHERE tour_id = $1 ORDER BY sort_order ASC';
      const imagesResult = await this.pool.query(imagesQuery, [id]);
      tour.images = imagesResult.rows;

      // Lấy thêm lịch trình (itinerary)
      const itineraryQuery = 'SELECT * FROM tour_itineraries WHERE tour_id = $1 ORDER BY day_number ASC';
      const itineraryResult = await this.pool.query(itineraryQuery, [id]);
      tour.itineraries = itineraryResult.rows;
    }

    return tour;
  }

  async create(tourData: any) {
    const { 
      name, description, image, countryId, tourTypeId, 
      duration, maxPeople, priceAdult, priceChild, 
      adventureLevel, altitude, hotelStar 
    } = tourData;

    const query = `
      INSERT INTO tours (
        name, description, image, country_id, tour_type_id, 
        duration, max_people, price_adult, price_child, 
        adventure_level, altitude, hotel_star
      )
      VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12)
      RETURNING *
    `;

    const result = await this.pool.query(query, [
      name, description, image, countryId, tourTypeId,
      duration, maxPeople, priceAdult, priceChild,
      adventureLevel, altitude, hotelStar
    ]);
    return result.rows[0];
  }
}
