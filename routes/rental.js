/**
 * Routes pour la gestion des locations.
 * Ce fichier de routage utilise express.Router pour définir des routes spécifiques à la gestion des locations dans l'application.
 * Il associe diverses opérations CRUD liées aux locations à leurs contrôleurs respectifs, en s'assurant que toutes les requêtes sont sécurisées
 * en passant par le middleware d'authentification avant d'atteindre le contrôleur.
 *
 * Chaque route est sécurisée par le middleware `auth` pour garantir que seuls les utilisateurs authentifiés peuvent accéder aux opérations sensibles.
 * Les méthodes dans `rentalCtrl` s'occupent de la logique spécifique à chaque opération sur les locations, en manipulant les données et en répondant aux requêtes.
 */

// Importation du framework Express et création d'un nouveau routeur
const express = require('express');
const router  = express.Router();

// Importation du middleware d'authentification pour sécuriser les routes,
// et du contrôleur pour gérer les actions sur les locations
const auth        = require('../middleware/auth');
const rentalCtrl  = require('../controllers/rental');

// Routes
router.get('/rentals', auth, rentalCtrl.findAllRental);
router.get('/rental/findByRenter/:renterId', auth, rentalCtrl.findRentalsByRenter);
router.get('/rental/findByVehicle/:vehicleId', auth, rentalCtrl.findRentalsByVehicle);
router.get('/rental/getRentalDetails/:id', auth, rentalCtrl.getRentalDetails);
router.put('/rental/update/:id', auth, rentalCtrl.updateRentalStatus);
router.post('/rental/add', auth, rentalCtrl.addRental);

module.exports = router;