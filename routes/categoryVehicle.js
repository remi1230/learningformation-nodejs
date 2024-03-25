const express = require('express');
const router  = express.Router();

const auth                 = require('../middleware/auth');
const categorieVehicleCtrl = require('../controllers/categorieVehicle');

router.get('/categorieVehicles', auth, categorieVehicleCtrl.findAllCategorieVehicle);
router.post('/categorieVehicle/add', auth, categorieVehicleCtrl.createCategorieVehicle);

module.exports = router;