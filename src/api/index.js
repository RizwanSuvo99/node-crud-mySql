// index.js
import pool from './db.js';

async function testDB() {
  try {
    const [rows] = await pool.query('SELECT NOW() AS time');
    console.log('Connected! Current Time:', rows[0].time);
  } catch (error) {
    console.error('Database connection failed:', error);
  }
}

testDB();
