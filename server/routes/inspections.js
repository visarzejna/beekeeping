const express = require('express');
const router = express.Router();

const AuthCtrl = require('../controllers/auth');
const InspectionCtrl = require('../controllers/inspections');

router.post('', AuthCtrl.onlyAuthUser, InspectionCtrl.createInspections);


module.exports = router;