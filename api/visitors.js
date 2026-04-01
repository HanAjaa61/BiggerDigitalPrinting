import { getPool } from './_db.js';

export default async function handler(req, res) {
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const pool = getPool(); // ← akan throw jika env vars kosong

    const [rows] = await pool.execute(
      `SELECT date, count
       FROM visitor_logs
       WHERE date >= DATE_SUB(CURDATE(), INTERVAL 30 DAY)
       ORDER BY date ASC`
    );

    return res.status(200).json(rows);

  } catch (err) {
    // Log detail: kode error MySQL, pesan, host yang dicoba
    console.error('[GET /api/visitors]', {
      message: err.message,
      code:    err.code,       // e.g. ECONNREFUSED, ER_ACCESS_DENIED_ERROR
      host:    process.env.DB_HOST,
      port:    process.env.DB_PORT,
    });
    return res.status(500).json({ error: err.message }); // ← tampilkan pesan asli sementara
  }
}