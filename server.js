const express = require('express');
const app = express();
const path = require('path');
const dotenv = require('dotenv');
const cors = require('cors');

// Charger les variables d'environnement
dotenv.config();

// Middleware pour parser le JSON
app.use(express.json());
app.use(cors());

// ✅ Permet de servir tous les fichiers statiques (HTML, CSS, JS, images)
app.use(express.static(path.join(__dirname, 'public')));

// Importer les routes
const vehicleRoutes = require('./routes/vehicle');

// Utiliser les routes
app.use('/api/vehicles', vehicleRoutes);

// ✅ Route pour tester le backend (optionnelle)
app.get('/api', (req, res) => {
  res.send('API Luxe Rental Car opérationnelle');
});

// Lancer le serveur
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Serveur lancé sur le port ${PORT}`);
});

