const { Pool } = require('pg');
require('dotenv').config();

const pool = new Pool({
  host: process.env.DATABASE_HOST || 'localhost',
  port: process.env.DATABASE_PORT || 5432,
  user: process.env.DATABASE_USER || 'postgres',
  password: process.env.DATABASE_PASSWORD || '05022004',
  database: process.env.DATABASE_NAME || 'vivu_travel',
});

async function sync() {
  const client = await pool.connect();
  try {
    console.log('Connecting to database to sync payments...');
    await client.query('BEGIN');
    
    // Sync confirmed bookings to paid payments
    const syncConfirmed = await client.query(`
      UPDATE payments 
      SET status = 'paid', paid_at = CURRENT_TIMESTAMP 
      WHERE status = 'pending' 
        AND booking_id IN (SELECT id FROM bookings WHERE status = 'confirmed')
    `);
    console.log(`Synced ${syncConfirmed.rowCount} payments to 'paid' (for Confirmed bookings).`);

    // Sync cancelled bookings to failed payments
    const syncCancelled = await client.query(`
      UPDATE payments 
      SET status = 'failed' 
      WHERE status = 'pending' 
        AND booking_id IN (SELECT id FROM bookings WHERE status = 'cancelled')
    `);
    console.log(`Synced ${syncCancelled.rowCount} payments to 'failed' (for Cancelled bookings).`);

    await client.query('COMMIT');
    console.log('Database synchronization completed successfully!');
  } catch (error) {
    await client.query('ROLLBACK');
    console.error('Error synchronizing database:', error);
  } finally {
    client.release();
    await pool.end();
  }
}

sync();
