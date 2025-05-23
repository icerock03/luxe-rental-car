const pool = require('../db');

exports.getAll = async () => {
  const result = await pool.query('SELECT * FROM bookings ORDER BY id DESC');
  return result.rows;
};

exports.create = async ({ vehicle_id, start_date, end_date }) => {
  return await pool.query(
    'INSERT INTO bookings (vehicle_id, start_date, end_date) VALUES ($1, $2, $3)',
    [vehicle_id, start_date, end_date]
  );
};
