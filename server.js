const express = require('express');
const cors = require('cors');
const path = require('path');
require('dotenv').config();
const app = express();
const pool = require('./db');

// Routes
const vehicleRoutes = require('./routes/vehicle');
const bookingRoutes = require('./routes/booking');
const adminRoutes = require('./routes/admin');

// Middlewares
app.use(cors());
app.use(express.json());

// ✅ Servir les fichiers statiques (images et public)
app.use('/upload', express.static(path.join(__dirname, 'upload')));
app.use(express.static(path.join(__dirname, 'public')));

// API Routes
app.use('/api/vehicles', vehicleRoutes);
app.use('/api/bookings', bookingRoutes);
app.use('/api/admin', adminRoutes);

// Lancer le serveur
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`✅ Serveur lancé sur le port ${PORT}`);
});
