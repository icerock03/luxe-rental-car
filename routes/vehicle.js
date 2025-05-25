const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const vehicleController = require('../controllers/vehicleController');

// Configuration du stockage des images avec multer
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.join(__dirname, '../public/upload/'));
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + file.originalname;
    cb(null, uniqueSuffix);
  }
});

const upload = multer({ storage });

// Routes
router.get('/', vehicleController.getAllVehicles);
router.post('/', upload.single('image'), vehicleController.addVehicle);
router.delete('/:id', vehicleController.deleteVehicle);

module.exports = router;

