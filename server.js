const express = require('express');
const cors = require('cors');
const path = require('path');
require('dotenv').config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// ✅ Servir les fichiers statiques (HTML, CSS, JS, IMAGES)
app.use(express.static(path.join(__dirname, 'public')));

// ✅ Routes
const vehicleRoutes = require('./routes/vehicle');
const bookingRoutes = require('./routes/booking');
const adminRoutes = require('./routes/admin');

app.use('/api/vehicles', vehicleRoutes);
app.use('/api/bookings', bookingRoutes);
app.use('/api/admin', adminRoutes);

// ✅ Démarrer le serveur
const PORT = process.env.PORT || 10000;
app.listen(PORT, '0.0.0.0', () => {
  console.log(`✅ Serveur lancé sur le port ${PORT}`);
});

