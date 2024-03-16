const express = require('express');
const router  = express.Router();

const auth        = require('../middleware/auth');
const multer      = require('../middleware/multer-config');
const vehicleCtrl = require('../controllers/vehicle');

router.get('/vehicles/all', auth, vehicleCtrl.findAllVehicle);
router.get('/vehicles/category/:categoryVehicleId', auth, vehicleCtrl.findVehiclesByCategory);
router.get('/vehicles/detail/:id', auth, vehicleCtrl.getVehicleDetails);
router.post('/vehicles/add', auth, multer, vehicleCtrl.addVehicle);
router.get('vehicles/update/:id', auth, multer, vehicleCtrl.updateVehicle);
router.get('vehicles/delete/:id', auth, vehicleCtrl.deleteVehicle);

module.exports = router;