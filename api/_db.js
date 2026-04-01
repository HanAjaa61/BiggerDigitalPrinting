import mysql from 'mysql2/promise';

let pool;

export function getPool() {
  if (!pool) {
    pool = mysql.createPool(process.env.DATABASE_URL + '?ssl={"rejectUnauthorized":false}');
  }
  return pool;
}