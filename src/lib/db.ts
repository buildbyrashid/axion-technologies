// src/lib/db.ts

/**
 * MySQL Database Connection Pool
 * 
 * This replaces Supabase client for database operations.
 * Uses connection pooling for better performance.
 */

import mysql from 'mysql2/promise';

// Check environment variables
if (!process.env.DB_HOST || !process.env.DB_USER || !process.env.DB_PASSWORD || !process.env.DB_NAME) {
  throw new Error('❌ Missing database credentials in .env.local file');
}

// Create connection pool
const pool = mysql.createPool({
  host: process.env.DB_HOST,
  port: parseInt(process.env.DB_PORT || '3306'),
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
  enableKeepAlive: true,
  keepAliveInitialDelay: 0,
  timezone: '+00:00',
});

// Test connection on startup
pool.getConnection()
  .then(connection => {
    console.log('✅ MySQL Connected:', process.env.DB_NAME);
    connection.release();
  })
  .catch(err => {
    console.error('❌ MySQL Connection Error:', err.message);
    console.error('📋 Check your .env.local file');
  });

export default pool;