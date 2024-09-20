const express = require('express');
const router = express.Router();
const { register, login, getUsers } = require('../controllers/authController');
const { authenticateToken } = require('../utils/authMiddleware');

router.post('/register', register);
router.post('/login', login);
router.get('/users', authenticateToken, getUsers);

module.exports = router;
