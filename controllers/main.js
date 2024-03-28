
/**
 * Ce fichier définit les routes pour servir des pages HTML au client.
 * Chaque fonction de route envoie un fichier HTML spécifique comme réponse à la requête du client,
 * permettant l'affichage de différentes pages de l'application web.
 */

// Importation du module path pour construire des chemins de fichier
const path = require('path');

// Routes
exports.indexPage    = (req, res, next) => { return res.status(200).sendFile(path.join(__dirname, '../views', 'index.html')); };
exports.usersPage    = (req, res, next) => { return res.status(200).sendFile(path.join(__dirname, '../views', 'users.html'));};
exports.vehiclesPage = (req, res, next) => { return res.status(200).sendFile(path.join(__dirname, '../views', 'vehicles.html'));};
exports.rentalsPage  = (req, res, next) => { return res.status(200).sendFile(path.join(__dirname, '../views', 'rentals.html'));};
exports.commentsPage = (req, res, next) => { return res.status(200).sendFile(path.join(__dirname, '../views', 'comments.html'));};
exports.modelPage    = (req, res, next) => { return res.status(200).sendFile(path.join(__dirname, '../views', 'model.html'));};
exports.testsPage    = (req, res, next) => { return res.status(200).sendFile(path.join(__dirname, '../views', 'tests.html'));};