const pool = require('../db');
const path = require('path');
const fs = require('fs');

exports.getAllVehicles = async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM vehicles ORDER BY id DESC');
    res.json(result.rows);
  } catch (err) {
    console.error('Erreur lors de la récupération des véhicules', err);
    res.status(500).json({ error: 'Erreur serveur' });
  }
};

exports.addVehicle = async (req, res) => {
  try {
    const { name, brand, price_per_day } = req.body;
    const image = req.file ? req.file.filename : null;

    if (!name || !brand || !price_per_day || !image) {
      return res.status(400).json({ error: 'Tous les champs sont obligatoires' });
    }

    await pool.query(
      'INSERT INTO vehicles (name, brand, price_per_day, image) VALUES ($1, $2, $3, $4)',
      [name, brand, price_per_day, image]
    );

    res.status(201).json({ message: 'Véhicule ajouté avec succès' });
  } catch (err) {
    console.error('Erreur lors de l\'ajout du véhicule', err);
    res.status(500).json({ error: 'Erreur serveur' });
  }
};

exports.deleteVehicle = async (req, res) => {
  const { id } = req.params;
  try {
    // Supprimer aussi l'image associée si nécessaire
    const result = await pool.query('SELECT image FROM vehicles WHERE id = $1', [id]);
    const image = result.rows[0]?.image;
    if (image) {
      const imagePath = path.join(__dirname, '../public/upload/', image);
      if (fs.existsSync(imagePath)) {
        fs.unlinkSync(imagePath);
      }
    }

    await pool.query('DELETE FROM vehicles WHERE id = $1', [id]);
    res.json({ message: 'Véhicule supprimé avec succès' });
  } catch (err) {
    console.error('Erreur suppression véhicule', err);
    res.status(500).json({ error: 'Erreur serveur' });
  }
};

