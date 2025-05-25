const express = require('express');
const cors = require('cors');
const path = require('path');
require('dotenv').config();
const app = express();
const pool = require('./db');

// Middleware
app.use(cors());
app.use(express.json());

// ✅ Servir les fichiers publics (HTML, CSS, JS)
app.use(express.static(path.join(__dirname, 'public')));

// ✅ Servir les images depuis /upload
app.use('/upload', express.static(path.join(__dirname, 'upload')));

// ✅ Importer les routes
const vehicleRoutes = require('./routes/vehicle');
const bookingRoutes = require('./routes/booking');
const adminRoutes = require('./routes/admin');

app.use('/api/vehicles', vehicleRoutes);
app.use('/api/bookings', bookingRoutes);
app.use('/api/admin', adminRoutes);

// ✅ Route d'accueil pour tester le fonctionnement
app.get('/', (req, res) => {
  res.send('Backend Luxe Rental Car fonctionne ✅');
});

// ✅ Lancer le serveur
const PORT = process.env.PORT || 5000;
app.listen(PORT, '0.0.0.0', () => {
  console.log(`✅ Serveur lancé sur le port ${PORT}`);
});
