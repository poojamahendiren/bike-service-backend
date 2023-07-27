const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');

// Route to handle user sign-up
router.post('/signup', authController.signup);

// Route to handle user sign-in
router.post('/signin', authController.signin);

module.exports = router;
