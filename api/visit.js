import { getPool } from './_db.js';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const pool = getPool();
    const today = new Date().toISOString().slice(0, 10);

    await pool.execute(
      `INSERT INTO visitor_logs (date, count)
       VALUES (?, 1)
       ON DUPLICATE KEY UPDATE count = count + 1`,
      [today]
    );

    return res.status(200).json({ ok: true });

  } catch (err) {
    console.error('[POST /api/visit]', {
      message: err.message,
      code:    err.code,
      host:    process.env.DB_HOST,
    });
    return res.status(500).json({ error: err.message });
  }
}