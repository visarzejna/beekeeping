const express = require('express');
const router = express.Router();

const BeehiveCtrl = require('../controllers/beehives');
const AuthCtrl = require('../controllers/auth');

router.post('', AuthCtrl.onlyAuthUser, BeehiveCtrl.createBeehives);

router.get('/:id', AuthCtrl.onlyAuthUser, BeehiveCtrl.getBeehiveById);


module.exports = router