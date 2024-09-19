const express = require('express');
const router = express.Router();
const { sendMessage, getMessages } = require('../controllers/messageController');
const { authenticateToken } = require('../utils/authMiddleware');

router.post('/:groupId', authenticateToken, sendMessage);
router.get('/:groupId', authenticateToken, getMessages);

module.exports = router;
