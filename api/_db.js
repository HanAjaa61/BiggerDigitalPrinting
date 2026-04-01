import mysql from 'mysql2/promise';

let pool;

export function getPool() {
  if (!pool) {
    pool = mysql.createPool({
      uri:                process.env.DATABASE_URL,
      ssl:                { rejectUnauthorized: false },
      waitForConnections: true,
      connectionLimit:    5,
      queueLimit:         0,
    });
  }
  return pool;
}