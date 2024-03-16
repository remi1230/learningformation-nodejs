const express = require('express');
const router  = express.Router();

const auth                 = require('../middleware/auth');
const categorieVehicleCtrl = require('../controllers/categorieVehicle');

router.get('/findAllCategorieVehicle', auth, categorieVehicleCtrl.findAllCategorieVehicle);
router.post('/createCategorieVehicle', auth, categorieVehicleCtrl.createCategorieVehicle);

module.exports = router;