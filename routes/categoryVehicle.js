/**
 * Configuration des routes pour les catégories de véhicules.
 * Chaque route est protégée par le middleware d'authentification pour s'assurer
 * que seuls les utilisateurs authentifiés peuvent effectuer des opérations.
 */

// Importation du framework Express et création d'un nouveau routeur
const express = require('express');
const router  = express.Router();

// Importation du middleware d'authentification pour sécuriser les routes,
// et du contrôleur gérant les actions sur les catégories de véhicules
const auth                 = require('../middleware/auth');
const categorieVehicleCtrl = require('../controllers/categorieVehicle');

//Routes
router.get('/categorieVehicles', auth, categorieVehicleCtrl.findAllCategorieVehicle);
router.post('/categorieVehicle/add', auth, categorieVehicleCtrl.createCategorieVehicle);

// Exportation du routeur configuré pour utilisation dans l'application principale
module.exports = router;