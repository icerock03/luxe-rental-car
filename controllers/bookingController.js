const pool = require('../db');

// ✅ Créer une réservation
exports.createBooking = async (req, res) => {
  const { vehicle_id, customer_name, start_date, end_date } = req.body;

  if (!vehicle_id || !customer_name || !start_date || !end_date) {
    return res.status(400).json({ error: 'Tous les champs sont obligatoires.' });
  }

  try {
    const result = await pool.query(
      'INSERT INTO bookings (vehicle_id, customer_name, start_date, end_date) VALUES ($1, $2, $3, $4) RETURNING *',
      [vehicle_id, customer_name, start_date, end_date]
    );
    res.status(201).json(result.rows[0]);
  } catch (error) {
    console.error('Erreur lors de la création de la réservation :', error);
    res.status(500).json({ error: 'Erreur serveur' });
  }
};

// ✅ Récupérer toutes les réservations
exports.getAllBookings = async (req, res) => {
  try {
    const result = await pool.query(`
      SELECT b.*, v.name AS vehicle_name
      FROM bookings b
      LEFT JOIN vehicles v ON b.vehicle_id = v.id
      ORDER BY b.id DESC
    `);
    res.json(result.rows);
  } catch (error) {
    console.error("Erreur lors de la récupération des réservations :", error);
    res.status(500).json({ error: "Erreur serveur" });
  }
};

// ✅ Supprimer une réservation
exports.deleteBooking = async (req, res) => {
  const id = req.params.id;

  try {
    await pool.query('DELETE FROM bookings WHERE id = $1', [id]);
    res.json({ message: 'Réservation supprimée' });
  } catch (error) {
    console.error("Erreur lors de la suppression :", error);
    res.status(500).json({ error: "Erreur serveur" });
  }
};

