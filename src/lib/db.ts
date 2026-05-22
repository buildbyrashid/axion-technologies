import mysql from "mysql2/promise";

const DB_HOST = process.env.DB_HOST || "127.0.0.1";

if (!process.env.DB_USER || !process.env.DB_NAME) {
  console.warn(
    "Missing database credentials in environment variables (DB_USER and DB_NAME are required)"
  );
}

const globalForDb = global as unknown as { pool?: mysql.Pool };

const pool =
  globalForDb.pool ||
  mysql.createPool({
    host: DB_HOST,
    port: Number(process.env.DB_PORT || 3306),
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0,
    enableKeepAlive: true,
    keepAliveInitialDelay: 0,
    timezone: "+00:00",
  });

if (process.env.NODE_ENV !== "production") {
  globalForDb.pool = pool;
}

export async function query<T = any>(
  sql: string,
  params: any[] = []
): Promise<T> {
  try {
    const [rows] = await pool.execute(sql, params);
    return rows as T;
  } catch (error: any) {
    console.error("Database query error:", error.message);
    throw new Error("Database error");
  }
}

export default pool;