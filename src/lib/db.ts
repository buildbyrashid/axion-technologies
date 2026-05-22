// src/lib/db.ts

/**
 * MySQL Database Connection Pool
 * 
 * Reuses a global singleton pool in development to prevent connection leaks
 * caused by Hot Module Replacement (HMR).
 */


import mysql from 'mysql2/promise';



// Check required environment variables
if (!process.env.DB_HOST || !process.env.DB_USER || !process.env.DB_NAME) {
  console.warn('⚠️ Missing database credentials in environment variables (DB_HOST, DB_USER, DB_NAME are required)');
}

// Singleton container for Next.js hot-reloading
const globalForDb = global as unknown as { pool: mysql.Pool };

const pool = globalForDb.pool || mysql.createPool({
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

if (process.env.NODE_ENV !== 'production') {
  globalForDb.pool = pool;
}


export default pool;