const { Pool } = require('pg');

const pool = new Pool({
  host: 'localhost',
  port: 5432,
  user: 'postgres',
  password: '05022004',
  database: 'vivu_travel',
});

async function migrate() {
  try {
    console.log('Creating table tour_images...');
    await pool.query(`
      CREATE TABLE IF NOT EXISTS public.tour_images (
        id SERIAL PRIMARY KEY,
        tour_id integer REFERENCES public.tours(id) ON DELETE CASCADE,
        image_url character varying(255) NOT NULL,
        is_primary boolean DEFAULT false,
        sort_order integer DEFAULT 0
      )
    `);
    console.log('Table tour_images created or already exists.');

    console.log('Creating table itinerary_details...');
    await pool.query(`
      CREATE TABLE IF NOT EXISTS public.itinerary_details (
        id SERIAL PRIMARY KEY,
        itinerary_id integer REFERENCES public.tour_itineraries(id) ON DELETE CASCADE,
        activity_description text NOT NULL,
        sort_order integer DEFAULT 0
      )
    `);
    console.log('Table itinerary_details created or already exists.');

    // Seed default data for tour_images if empty
    const countRes = await pool.query('SELECT COUNT(*) FROM public.tour_images');
    if (parseInt(countRes.rows[0].count, 10) === 0) {
      console.log('Seeding tour_images...');
      await pool.query(`
        INSERT INTO public.tour_images (id, tour_id, image_url, is_primary, sort_order) 
        VALUES (1, 1, '/uploads/tours/1099e21475d99ce10391080464ea3f127f.jpg', true, 0)
        ON CONFLICT (id) DO NOTHING
      `);
      console.log('tour_images seeded successfully.');
    }
  } catch (err) {
    console.error('MIGRATION ERROR:', err.message);
    console.error(err.stack);
  } finally {
    await pool.end();
  }
}

migrate();
