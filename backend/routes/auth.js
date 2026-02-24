const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');

router.post('/login', authController.login);
router.post('/register', authController.registerUser);
router.post('/user-login', authController.userLogin);

module.exports = router;
