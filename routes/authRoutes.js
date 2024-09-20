const express = require('express');
const router = express.Router();
<<<<<<< HEAD
const { register, login, getUsers } = require('../controllers/authController');
const { authenticateToken } = require('../utils/authMiddleware');

router.post('/register', register);
router.post('/login', login);
router.get('/users', authenticateToken, getUsers);
=======
const { register, login } = require('../controllers/authController');

router.post('/register', register);
router.post('/login', login);
>>>>>>> 268b1808510ad8ec53727b2f3504d27760b2a060

module.exports = router;
