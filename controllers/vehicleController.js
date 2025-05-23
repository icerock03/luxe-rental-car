const vehicleModel = require('../models/vehicleModel');

// 🔹 Récupérer tous les véhicules
exports.getAllVehicles = async (req, res) => {
  try {
    const vehicles = await vehicleModel.getAll();
    res.json(vehicles);
  } catch (err) {
    console.error('Erreur dans getAllVehicles :', err.message);
    res.status(500).json({ error: 'Erreur lors de la récupération des véhicules' });
  }
};

// 🔹 Ajouter un véhicule AVEC image (multipart/form-data)
exports.addVehicleWithImage = async (req, res) => {
  const { name, brand, price_per_day } = req.body;
  const image = req.file ? req.file.filename : null;

  if (!name || !brand || !price_per_day || !image) {
    return res.status(400).json({ error: 'Tous les champs sont obligatoires.' });
  }

  try {
    await vehicleModel.create({ name, brand, price_per_day, image });
    res.status(201).json({ message: 'Véhicule ajouté avec succès' });
  } catch (err) {
    console.error('Erreur dans addVehicleWithImage :', err.message);
    res.status(500).json({ error: "Erreur lors de l'ajout du véhicule" });
  }
};

// 🔹 Supprimer un véhicule
exports.deleteVehicle = async (req, res) => {
  const id = req.params.id;

  try {
    await vehicleModel.delete(id);
    res.json({ message: 'Véhicule supprimé avec succès' });
  } catch (err) {
    console.error('Erreur dans deleteVehicle :', err.message);
    res.status(500).json({ error: "Erreur lors de la suppression du véhicule" });
  }
};

