const express = require('express');
const router = express.Router();
const adminController = require('../controllers/adminController');

router.get('/bookings', adminController.getBookings);
router.post('/login', adminController.login); // simple vérification email/mot de passe

module.exports = router;
