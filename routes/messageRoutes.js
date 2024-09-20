const express = require('express');
const router = express.Router();
const { sendMessage, getMessages } = require('../controllers/messageController');
const { authenticateToken } = require('../utils/authMiddleware');

router.post('/', authenticateToken, sendMessage);
router.get('/:otherUserId', authenticateToken, getMessages);

module.exports = router;