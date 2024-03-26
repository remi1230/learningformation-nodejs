/**
 * Ce fichier définit les routes principales de l'application web et associe chaque route à une fonction de contrôleur spécifique.
 * Utilisant express.Router pour créer un gestionnaire de routes modulaire et montable, ce fichier facilite la maintenance et l'organisation du routage.
 * 
 * Les routes définies ici sont principalement des routes de test qui servent à afficher différentes pages pour démontrer la fonctionnalité de l'application.
 * Chaque route est associée à une méthode dans le contrôleur principal (`mainCtrl`), qui traite la requête et renvoie une réponse au client.
 * 
 * Routes incluses :
 * - Une route racine (`/`) pour la page d'accueil.
 * - Routes sous le chemin `/test` pour tester différentes ressources comme les utilisateurs, commentaires, véhicules, et locations.
 */

const express = require('express');
const router  = express.Router();

const mainCtrl  = require('../controllers/main');

router.get('/', mainCtrl.indexPage);
router.get('/test/model', mainCtrl.modelPage);
router.get('/test/users', mainCtrl.usersPage);
router.get('/test/comments', mainCtrl.commentsPage);
router.get('/test/vehicles', mainCtrl.vehiclesPage);
router.get('/test/rentals', mainCtrl.rentalsPage);

module.exports = router;