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