const express = require('express');
const router  = express.Router();

const auth        = require('../middleware/auth');
const rentalCtrl  = require('../controllers/rental');

router.get('/rental/findByRenter/:renterId', auth, rentalCtrl.findRentalsByRenter);
router.get('/rental/findByVehicle/:vehicleId', auth, rentalCtrl.findRentalsByVehicle);
router.post('/rental/update/:id', auth, rentalCtrl.updateRentalStatus);
router.post('/rental/add', auth, rentalCtrl.addRental);

module.exports = router;