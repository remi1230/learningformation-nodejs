/**
 * Routes pour la gestion des commentaires.
 * Ces routes permettent de récupérer et d'ajouter des commentaires pour les véhicules.
 * L'accès à ces routes nécessite une authentification, assurée par le middleware `auth`.
 */

// Importation du framework Express et création d'un nouveau routeur
const express = require('express');
const router  = express.Router();

// Importation du middleware d'authentification pour sécuriser les routes,
// et du contrôleur pour gérer les actions sur les commentaires
const auth        = require('../middleware/auth');
const commentCtrl = require('../controllers/comment');

// ROUTES
// Route pour récupérer tous les commentaires associés à un véhicule spécifique
// L'ID du véhicule est passé dans le chemin de la route comme paramètre `vehicleId`.
router.get('/comment/:vehicleId', auth, commentCtrl.findCommentsByVehicle);
// Route pour ajouter un nouveau commentaire à la base de données
// Les données nécessaires pour créer le commentaire doivent être incluses dans le corps de la requête POST.
router.post('/comment/add', auth, commentCtrl.addComment);

// Exportation du routeur configuré pour son utilisation dans l'application Express principale
module.exports = router;