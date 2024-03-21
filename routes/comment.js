const express = require('express');
const router  = express.Router();

const auth        = require('../middleware/auth');
const commentCtrl = require('../controllers/comment');

router.get('/comment/:vehicleId', auth, commentCtrl.findCommentsByVehicle);
router.post('/comment/add', auth, commentCtrl.addComment);

module.exports = router;