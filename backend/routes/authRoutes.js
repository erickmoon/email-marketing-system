const express = require('express');
const { login, register, logout } = require('../controllers/authController');
const authMiddleware = require('../middleware/authMiddleware');

const router = express.Router();

router.post('/login', login);
router.post('/logout', authMiddleware, logout); // Apply authMiddleware if you want to protect the logout route

module.exports = router;
