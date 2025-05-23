const bookingModel = require('../models/bookingModel');

exports.getAllBookings = async (req, res) => {
  try {
    const bookings = await bookingModel.getAll();
    res.json(bookings);
  } catch (err) {
    console.error('🔴 Erreur dans getAllBookings :', err.message);
    res.status(500).json({ error: 'Erreur lors de la récupération des réservations' });
  }
};

exports.createBooking = async (req, res) => {
  const { vehicle_id, start_date, end_date } = req.body;

  // Vérification des champs
  if (!vehicle_id || !start_date || !end_date) {
    return res.status(400).json({ error: 'Tous les champs sont obligatoires.' });
  }

  try {
    await bookingModel.create({ vehicle_id, start_date, end_date });
    res.status(201).json({ message: 'Réservation enregistrée avec succès' });
  } catch (err) {
    console.error('🔴 Erreur dans createBooking :', err.message);
    res.status(500).json({ error: 'Erreur lors de la création de la réservation' });
  }
};

