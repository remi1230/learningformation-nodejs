const path = require('path');

exports.indexPage    = (req, res, next) => { return res.status(200).sendFile(path.join(__dirname, '../views', 'index.html')); };
exports.usersPage    = (req, res, next) => { return res.status(200).sendFile(path.join(__dirname, '../views', 'users.html'));};
exports.vehiclesPage = (req, res, next) => { return res.status(200).sendFile(path.join(__dirname, '../views', 'vehicles.html'));};
exports.rentalsPage  = (req, res, next) => { return res.status(200).sendFile(path.join(__dirname, '../views', 'rentals.html'));};
exports.commentsPage = (req, res, next) => { return res.status(200).sendFile(path.join(__dirname, '../views', 'comments.html'));};
exports.modelPage    = (req, res, next) => { return res.status(200).sendFile(path.join(__dirname, '../views', 'model.html'));};