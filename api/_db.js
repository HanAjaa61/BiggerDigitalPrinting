import mysql from 'mysql2/promise';

let pool;

export function getPool() {
  if (!pool) {
    // Validasi env vars sebelum membuat pool
    const required = ['DB_HOST', 'DB_USER', 'DB_PASSWORD', 'DB_NAME'];
    const missing = required.filter(k => !process.env[k]);
    if (missing.length) {
      throw new Error(`Missing env vars: ${missing.join(', ')}`);
    }

    pool = mysql.createPool({
      host:               process.env.DB_HOST,
      port:               Number(process.env.DB_PORT) || 53943,
      user:               process.env.DB_USER,
      password:           process.env.DB_PASSWORD,
      database:           process.env.DB_NAME,
      ssl:                { rejectUnauthorized: false },
      waitForConnections: true,
      connectionLimit:    5,
      queueLimit:         0,
      connectTimeout:     10000, // ← tambah timeout 10s
    });
  }
  return pool;
}