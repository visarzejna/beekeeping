const express = require('express');
const router = express.Router();

const UserCtrl = require('../controllers/users');

router.get('/getUsers', UserCtrl.getUsers)

router.get('/me', UserCtrl.getCurrentUser);

router.post('/register', UserCtrl.register);

router.post('/login', UserCtrl.login)

module.exports = router;