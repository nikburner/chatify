const express = require('express');
const router = express.Router();
const { createGroup } = require('../controllers/groupController');
const { authenticateToken } = require('../utils/authMiddleware');

router.post('/', createGroup);

module.exports = router;
