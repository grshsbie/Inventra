const express = require('express');
const router = express.Router();
const { login, confirmSecondPassword } = require('../controllers/authController');

// Admin login
router.post('/login', login);

// Confirm second password via email
router.post('/confirm-password', confirmSecondPassword);

module.exports = router;
