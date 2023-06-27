const express = require('express');
const router = express.Router();

const BeehiveCtrl = require('../controllers/beehive');
const AuthCtrl = require('../controllers/auth');

router.post('', AuthCtrl.onlyAuthUser, BeehiveCtrl.createBeehives);

// router.get('')

module.exports = router