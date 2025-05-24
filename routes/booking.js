const express = require('express');
const router = express.Router();
const bookingController = require('../controllers/bookingController');

// Ajouter une réservation
router.post('/', bookingController.createBooking);

// Récupérer toutes les réservations
router.get('/', bookingController.getAllBookings);

// Supprimer une réservation
router.delete('/:id', bookingController.deleteBooking);

module.exports = router;
