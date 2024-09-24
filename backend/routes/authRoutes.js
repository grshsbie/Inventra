const express = require('express');
const router = express.Router();
const { login, confirmSecondPassword } = require('../controllers/authController');

router.post('/login', login);

router.post('/register', register);

router.post('/confirm-password', confirmSecondPassword);

module.exports = router;
