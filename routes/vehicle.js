/**
 * Routes pour la gestion des véhicules.
 * 
 * Ce fichier utilise express.Router pour organiser les routes liées à la gestion des véhicules.
 * Il permet aux utilisateurs authentifiés de réaliser différentes opérations CRUD sur les véhicules,
 * telles que l'affichage de tous les véhicules, la recherche de véhicules par catégorie, l'obtention des détails d'un véhicule spécifique,
 * l'ajout, la mise à jour, et la suppression de véhicules.
 * Le middleware d'authentification `auth` est appliqué à toutes les routes pour garantir que seules les requêtes authentifiées peuvent interagir avec les ressources de véhicules.
 * De plus, le middleware `multer` est utilisé dans les routes d'ajout et de mise à jour pour gérer le téléchargement d'images de véhicules,
 * permettant ainsi une gestion complète des données de véhicules, y compris leurs images.
 * 
 */

const express = require('express');
const router  = express.Router();

const auth        = require('../middleware/auth');
const multer      = require('../middleware/multer-config');
const vehicleCtrl = require('../controllers/vehicle');

router.get('/vehicles', auth, vehicleCtrl.findAllVehicle);
router.get('/vehicles/category/:categoryVehicleId', auth, vehicleCtrl.findVehiclesByCategory);
router.get('/vehicles/detail/:id', auth, vehicleCtrl.getVehicleDetails);
router.post('/vehicles/add', auth, multer, vehicleCtrl.addVehicle);
router.put('/vehicles/update/:id', auth, multer, vehicleCtrl.updateVehicle);
router.delete('/vehicles/delete/:id', auth, vehicleCtrl.deleteVehicle);

module.exports = router;