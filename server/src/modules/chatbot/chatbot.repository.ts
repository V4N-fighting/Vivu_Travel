import { Inject, Injectable, Logger } from '@nestjs/common';
import { Pool } from 'pg';
import { POSTGRES_POOL } from '../../database/postgres.provider';
import { ChatMessage, TourCandidate, TravelDocument, UserMemory } from './chatbot.types';

@Injectable()
export class ChatbotRepository {
  private readonly logger = new Logger(ChatbotRepository.name);

  constructor(@Inject(POSTGRES_POOL) private readonly pool: Pool) {}

  async ensureRuntimeTables() {
    await this.pool.query(`
      CREATE EXTENSION IF NOT EXISTS pgcrypto;

      CREATE TABLE IF NOT EXISTS ai_chat_sessions (
        id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
        user_id INT NULL REFERENCES users(id) ON DELETE SET NULL,
        session_key VARCHAR(120) UNIQUE NOT NULL,
        memory JSONB DEFAULT '{}'::jsonb,
        summary TEXT,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );

      CREATE TABLE IF NOT EXISTS ai_chat_messages (
        id BIGSERIAL PRIMARY KEY,
        session_id UUID REFERENCES ai_chat_sessions(id) ON DELETE CASCADE,
        role VARCHAR(20) NOT NULL,
        content TEXT NOT NULL,
        metadata JSONB DEFAULT '{}'::jsonb,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );

      CREATE TABLE IF NOT EXISTS ai_chat_analytics (
        id BIGSERIAL PRIMARY KEY,
        session_id UUID REFERENCES ai_chat_sessions(id) ON DELETE SET NULL,
        user_message TEXT,
        detected_intent VARCHAR(100),
        retrieved_count INT DEFAULT 0,
        latency_ms INT DEFAULT 0,
        error TEXT,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );
    `);
  }

  async getSchemaContext() {
    const tablesResult = await this.pool.query(`
      SELECT table_name, column_name, data_type
      FROM information_schema.columns
      WHERE table_schema = 'public'
        AND table_name NOT LIKE 'ai_chat_%'
      ORDER BY table_name, ordinal_position
    `);

    const relationsResult = await this.pool.query(`
      SELECT
        tc.table_name AS source_table,
        kcu.column_name AS source_column,
        ccu.table_name AS target_table,
        ccu.column_name AS target_column
      FROM information_schema.table_constraints tc
      JOIN information_schema.key_column_usage kcu
        ON tc.constraint_name = kcu.constraint_name
       AND tc.table_schema = kcu.table_schema
      JOIN information_schema.constraint_column_usage ccu
        ON ccu.constraint_name = tc.constraint_name
       AND ccu.table_schema = tc.table_schema
      WHERE tc.constraint_type = 'FOREIGN KEY'
        AND tc.table_schema = 'public'
      ORDER BY tc.table_name, kcu.column_name
    `);

    const tables = tablesResult.rows.reduce((acc: Record<string, string[]>, row) => {
      acc[row.table_name] = acc[row.table_name] || [];
      acc[row.table_name].push(`${row.column_name}:${row.data_type}`);
      return acc;
    }, {});

    const importantTables = [
      'tours',
      'bookings',
      'users',
      'reviews',
      'blogs',
      'countries',
      'activities',
      'coupons',
      'tour_itineraries',
      'itinerary_details',
      'tour_transportations',
      'tour_departure_dates',
      'payments',
      'contacts',
    ];

    return {
      tables: Object.fromEntries(
        (Object.entries(tables) as [string, string[]][])
          .filter(([table]) => importantTables.includes(table))
          .map(([table, columns]) => [table, columns.slice(0, 24)]),
      ),
      relationships: relationsResult.rows
        .filter((relation) => importantTables.includes(relation.source_table) || importantTables.includes(relation.target_table))
        .slice(0, 60),
    };
  }

  async getOrCreateSession(sessionKey: string, userId?: number) {
    await this.ensureRuntimeTables();
    const existing = await this.pool.query(
      'SELECT * FROM ai_chat_sessions WHERE session_key = $1 LIMIT 1',
      [sessionKey],
    );
    if (existing.rows[0]) return existing.rows[0];

    const created = await this.pool.query(
      `INSERT INTO ai_chat_sessions (session_key, user_id)
       VALUES ($1, $2)
       RETURNING *`,
      [sessionKey, userId || null],
    );
    return created.rows[0];
  }

  async getMessages(sessionId: string, limit = 12): Promise<ChatMessage[]> {
    const result = await this.pool.query(
      `SELECT role, content
       FROM ai_chat_messages
       WHERE session_id = $1
       ORDER BY created_at DESC
       LIMIT $2`,
      [sessionId, limit],
    );
    return result.rows.reverse();
  }

  async saveMessage(sessionId: string, role: string, content: string, metadata: any = {}) {
    await this.pool.query(
      `INSERT INTO ai_chat_messages (session_id, role, content, metadata)
       VALUES ($1, $2, $3, $4)`,
      [sessionId, role, content, metadata],
    );
  }

  async updateMemory(sessionId: string, memory: UserMemory, summary?: string) {
    await this.pool.query(
      `UPDATE ai_chat_sessions
       SET memory = $2, summary = COALESCE($3, summary), updated_at = CURRENT_TIMESTAMP
       WHERE id = $1`,
      [sessionId, memory, summary || null],
    );
  }

  async logAnalytics(data: {
    sessionId?: string;
    userMessage: string;
    detectedIntent?: string;
    retrievedCount?: number;
    latencyMs?: number;
    error?: string;
  }) {
    try {
      await this.pool.query(
        `INSERT INTO ai_chat_analytics
          (session_id, user_message, detected_intent, retrieved_count, latency_ms, error)
         VALUES ($1, $2, $3, $4, $5, $6)`,
        [
          data.sessionId || null,
          data.userMessage,
          data.detectedIntent || null,
          data.retrievedCount || 0,
          data.latencyMs || 0,
          data.error || null,
        ],
      );
    } catch (error) {
      this.logger.warn(`Could not write chat analytics: ${(error as Error).message}`);
    }
  }

  async searchToursBySql(filters: any, limit = 8): Promise<TourCandidate[]> {
    const params: any[] = [];
    let query = `
      SELECT
        t.id,
        t.name,
        t.description,
        t.duration,
        t.price_adult::float,
        t.price_child::float,
        t.max_people,
        t.hotel_star,
        t.meeting_point,
        t.booking_deadline_days,
        c.name AS country_name,
        tt.name AS tour_type_name,
        COALESCE(AVG(r.rating), 0)::float AS avg_rating,
        COUNT(DISTINCT r.id)::int AS review_count,
        COUNT(DISTINCT b.id)::int AS booking_count,
        MIN(tdd.departure_date) FILTER (WHERE tdd.departure_date >= CURRENT_DATE) AS next_departure,
        COUNT(DISTINCT tdd.id) FILTER (WHERE tdd.departure_date >= CURRENT_DATE) AS upcoming_departure_count,
        COALESCE(array_remove(array_agg(DISTINCT a.name), NULL), '{}') AS activities,
        COALESCE(array_remove(array_agg(DISTINCT tr.transportation), NULL), '{}') AS transportations
      FROM tours t
      LEFT JOIN countries c ON c.id = t.country_id
      LEFT JOIN tour_types tt ON tt.id = t.tour_type_id
      LEFT JOIN reviews r ON r.tour_id = t.id
      LEFT JOIN bookings b ON b.tour_id = t.id
      LEFT JOIN tour_departure_dates tdd ON tdd.tour_id = t.id
      LEFT JOIN tour_activities ta ON ta.tour_id = t.id
      LEFT JOIN activities a ON a.id = ta.activity_id
      LEFT JOIN tour_transportations tr ON tr.tour_id = t.id
      WHERE t.is_active = TRUE
    `;

    if (filters.searchText) {
      params.push(filters.searchText);
      query += ` AND (
        to_tsvector('simple', coalesce(t.name, '') || ' ' || coalesce(t.description, '') || ' ' || coalesce(c.name, '') || ' ' || coalesce(tt.name, ''))
          @@ websearch_to_tsquery('simple', $${params.length})
        OR t.name ILIKE '%' || $${params.length} || '%'
        OR t.description ILIKE '%' || $${params.length} || '%'
        OR c.name ILIKE '%' || $${params.length} || '%'
      )`;
    }
    if (filters.budget) {
      params.push(filters.budget);
      query += ` AND t.price_adult <= $${params.length}`;
    }
    if (filters.people) {
      params.push(filters.people);
      query += ` AND (t.max_people IS NULL OR t.max_people >= $${params.length})`;
    }
    if (filters.destination) {
      params.push(`%${filters.destination}%`);
      query += ` AND (
        c.name ILIKE $${params.length}
        OR t.name ILIKE $${params.length}
        OR t.description ILIKE $${params.length}
      )`;
    }
    if (filters.minRating) {
      params.push(filters.minRating);
      query += ` AND EXISTS (
        SELECT 1 FROM reviews rx
        WHERE rx.tour_id = t.id
        GROUP BY rx.tour_id
        HAVING AVG(rx.rating) >= $${params.length}
      )`;
    }
    if (filters.dateFrom) {
      params.push(filters.dateFrom);
      query += ` AND EXISTS (
        SELECT 1 FROM tour_departure_dates d
        WHERE d.tour_id = t.id AND d.departure_date >= $${params.length}
      )`;
    }
    if (filters.dateTo) {
      params.push(filters.dateTo);
      query += ` AND EXISTS (
        SELECT 1 FROM tour_departure_dates d
        WHERE d.tour_id = t.id AND d.departure_date <= $${params.length}
      )`;
    }
    if (filters.activities?.length) {
      params.push(filters.activities);
      query += ` AND EXISTS (
        SELECT 1
        FROM tour_activities ta2
        JOIN activities a2 ON a2.id = ta2.activity_id
        WHERE ta2.tour_id = t.id
          AND a2.name ILIKE ANY (
            ARRAY(SELECT '%' || unnest($${params.length}::text[]) || '%')
          )
      )`;
    }

    query += `
      GROUP BY t.id, c.name, tt.name
      ORDER BY avg_rating DESC, booking_count DESC, t.price_adult ASC
      LIMIT ${Math.min(limit, 20)}
    `;

    const result = await this.pool.query(query, params);
    return result.rows;
  }

  async fullTextSearch(message: string, limit = 10): Promise<TravelDocument[]> {
    const result = await this.pool.query(
      `
      WITH q AS (SELECT websearch_to_tsquery('simple', $1) AS query)
      SELECT *
      FROM (
        SELECT
          0 AS id,
          'tour' AS "sourceType",
          t.id AS "sourceId",
          t.name AS title,
          concat_ws(E'\n',
            'Tour: ' || t.name,
            'Country: ' || c.name,
            'Type: ' || tt.name,
            'Duration: ' || t.duration,
            'Price adult: ' || t.price_adult,
            'Price child: ' || t.price_child,
            'Description: ' || t.description,
            'Activities: ' || COALESCE(string_agg(DISTINCT a.name, ', '), ''),
            'Transportation: ' || COALESCE(string_agg(DISTINCT tr.transportation, ', '), '')
          ) AS content,
          jsonb_build_object('tourId', t.id, 'country', c.name, 'priceAdult', t.price_adult) AS metadata,
          ts_rank(
            to_tsvector('simple', coalesce(t.name, '') || ' ' || coalesce(t.description, '') || ' ' || coalesce(c.name, '') || ' ' || coalesce(tt.name, '') || ' ' || coalesce(string_agg(DISTINCT a.name, ' '), '')),
            q.query
          ) AS similarity
        FROM tours t
        LEFT JOIN countries c ON c.id = t.country_id
        LEFT JOIN tour_types tt ON tt.id = t.tour_type_id
        LEFT JOIN tour_activities ta ON ta.tour_id = t.id
        LEFT JOIN activities a ON a.id = ta.activity_id
        LEFT JOIN tour_transportations tr ON tr.tour_id = t.id
        CROSS JOIN q
        WHERE t.is_active = TRUE
        GROUP BY t.id, c.name, tt.name, q.query

        UNION ALL

        SELECT
          0, 'blog', b.id, b.title,
          concat_ws(E'\n', 'Blog: ' || b.title, b.content),
          jsonb_build_object('slug', b.slug),
          ts_rank(to_tsvector('simple', coalesce(b.title, '') || ' ' || coalesce(b.content, '')), q.query)
        FROM blogs b
        CROSS JOIN q
        WHERE b.status = 'published'

        UNION ALL

        SELECT
          0, 'country', c.id, c.name,
          concat_ws(E'\n', 'Country: ' || c.name, c.description),
          '{}'::jsonb,
          ts_rank(to_tsvector('simple', coalesce(c.name, '') || ' ' || coalesce(c.description, '')), q.query)
        FROM countries c
        CROSS JOIN q
      ) ranked
      WHERE similarity > 0
         OR title ILIKE '%' || $1 || '%'
         OR content ILIKE '%' || $1 || '%'
      ORDER BY similarity DESC
      LIMIT $2
      `,
      [message, limit],
    );
    return result.rows;
  }

  async getTourDetails(tourIds: number[]) {
    if (!tourIds.length) return [];
    const result = await this.pool.query(
      `
      SELECT
        t.id,
        t.name,
        json_agg(DISTINCT jsonb_build_object('day', ti.day_number, 'title', ti.title, 'description', ti.description)) AS itineraries,
        json_agg(DISTINCT jsonb_build_object('dateId', tdd.id, 'date', tdd.departure_date, 'availableSlots', tdd.available_slots)) AS departures
      FROM tours t
      LEFT JOIN tour_itineraries ti ON ti.tour_id = t.id
      LEFT JOIN tour_departure_dates tdd ON tdd.tour_id = t.id AND tdd.departure_date >= CURRENT_DATE
      WHERE t.id = ANY($1::int[])
      GROUP BY t.id
      `,
      [tourIds],
    );
    return result.rows;
  }

  async getActiveCoupons() {
    const result = await this.pool.query(`
      SELECT code, discount_type, discount_value, min_order_value, max_discount_amount, valid_to
      FROM coupons
      WHERE is_active = TRUE
        AND (valid_from IS NULL OR valid_from <= CURRENT_DATE)
        AND (valid_to IS NULL OR valid_to >= CURRENT_DATE)
        AND (usage_limit IS NULL OR used_count < usage_limit)
      ORDER BY discount_value DESC
      LIMIT 5
    `);
    return result.rows;
  }

  async getFeaturedTours(limit = 6): Promise<TourCandidate[]> {
    const result = await this.pool.query(
      `
      SELECT
        t.id,
        t.name,
        t.description,
        t.duration,
        t.price_adult::float,
        t.price_child::float,
        t.max_people,
        t.hotel_star,
        t.meeting_point,
        c.name AS country_name,
        tt.name AS tour_type_name,
        COALESCE(AVG(r.rating), 0)::float AS avg_rating,
        COUNT(DISTINCT r.id)::int AS review_count,
        COUNT(DISTINCT b.id)::int AS booking_count,
        MIN(tdd.departure_date) FILTER (WHERE tdd.departure_date >= CURRENT_DATE) AS next_departure,
        COALESCE(array_remove(array_agg(DISTINCT a.name), NULL), '{}') AS activities,
        COALESCE(array_remove(array_agg(DISTINCT tr.transportation), NULL), '{}') AS transportations
      FROM tours t
      LEFT JOIN countries c ON c.id = t.country_id
      LEFT JOIN tour_types tt ON tt.id = t.tour_type_id
      LEFT JOIN reviews r ON r.tour_id = t.id
      LEFT JOIN bookings b ON b.tour_id = t.id
      LEFT JOIN tour_departure_dates tdd ON tdd.tour_id = t.id
      LEFT JOIN tour_activities ta ON ta.tour_id = t.id
      LEFT JOIN activities a ON a.id = ta.activity_id
      LEFT JOIN tour_transportations tr ON tr.tour_id = t.id
      WHERE t.is_active = TRUE
      GROUP BY t.id, c.name, tt.name
      ORDER BY booking_count DESC, avg_rating DESC, t.created_at DESC
      LIMIT $1
      `,
      [limit],
    );
    return result.rows;
  }

}
