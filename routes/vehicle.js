const express = require('express');
const router = express.Router();
const vehicleController = require('../controllers/vehicleController');
const multer = require('multer');

// Configuration de stockage avec multer
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'upload/');
  },
  filename: (req, file, cb) => {
    const uniqueName = Date.now() + '-' + file.originalname;
    cb(null, uniqueName);
  }
});

const upload = multer({ storage });

// ROUTES

// GET : tous les véhicules
router.get('/', vehicleController.getAllVehicles);

// POST : ajouter un véhicule avec image
router.post('/', upload.single('image'), vehicleController.addVehicleWithImage);

// DELETE : supprimer un véhicule par ID
router.delete('/:id', vehicleController.deleteVehicle);

module.exports = router;
