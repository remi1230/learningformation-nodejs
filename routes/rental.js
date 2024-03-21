const express = require('express');
const router  = express.Router();

const auth        = require('../middleware/auth');
const rentalCtrl  = require('../controllers/rental');

router.get('/rental/findAllRental', auth, rentalCtrl.findAllRental);
router.get('/rental/findUsersWithRentals', auth, rentalCtrl.findUsersWithRentals);
router.get('/rental/findByRenter/:renterId', auth, rentalCtrl.findRentalsByRenter);
router.get('/rental/findByVehicle/:vehicleId', auth, rentalCtrl.findRentalsByVehicle);
router.get('/rental/getRentalDetails/:id', auth, rentalCtrl.getRentalDetails);
router.put('/rental/update/:id', auth, rentalCtrl.updateRentalStatus);
router.post('/rental/add', auth, rentalCtrl.addRental);

module.exports = router;