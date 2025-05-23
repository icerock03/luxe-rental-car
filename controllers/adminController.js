const bookingModel = require('../models/bookingModel');

// 🔹 Voir les réservations (utilisé dans admin-bookings.html)
exports.getBookings = async (req, res) => {
  try {
    const bookings = await bookingModel.getAll();
    res.json(bookings);
  } catch (err) {
    res.status(500).json({ error: 'Erreur lors du chargement des réservations' });
  }
};

// 🔐 Connexion simple d’admin (email + mot de passe)
exports.login = async (req, res) => {
  const { email, password } = req.body;

  // Identifiants codés en dur (tu pourras les sécuriser plus tard)
  if (email === 'admin@luxe.com' && password === 'admin123') {
    res.json({ message: 'Connexion réussie' });
  } else {
    res.status(401).json({ error: 'Identifiants incorrects' });
  }
};
