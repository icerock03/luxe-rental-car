const pool = require('../db');

// 🔹 Récupérer tous les véhicules
exports.getAll = async () => {
  const result = await pool.query('SELECT * FROM vehicles ORDER BY id DESC');
  return result.rows;
};

// 🔹 Ajouter un véhicule
exports.create = async ({ name, brand, price_per_day, image }) => {
  return await pool.query(
    'INSERT INTO vehicles (name, brand, price_per_day, image) VALUES ($1, $2, $3, $4)',
    [name, brand, price_per_day, image]
  );
};

// 🔹 Supprimer un véhicule
exports.delete = async (id) => {
  return await pool.query('DELETE FROM vehicles WHERE id = $1', [id]);
};
