import { getPool } from './_db.js';

export default async function handler(req, res) {
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const pool = getPool();

    const [rows] = await pool.execute(
      `SELECT date, count
       FROM visitor_logs
       WHERE date >= DATE_SUB(CURDATE(), INTERVAL 30 DAY)
       ORDER BY date ASC`
    );

    return res.status(200).json(rows);
  } catch (err) {
    console.error('[GET /api/visitors]', err);
    return res.status(500).json({ error: 'Internal server error' });
  }
}