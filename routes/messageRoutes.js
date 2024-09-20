const express = require('express');
const router = express.Router();
const { sendMessage, getMessages } = require('../controllers/messageController');
const { authenticateToken } = require('../utils/authMiddleware');

<<<<<<< HEAD
router.post('/', authenticateToken, sendMessage);
router.get('/:otherUserId', authenticateToken, getMessages);

module.exports = router;
=======
router.post('/:groupId', authenticateToken, sendMessage);
router.get('/:groupId', authenticateToken, getMessages);

module.exports = router;
>>>>>>> 268b1808510ad8ec53727b2f3504d27760b2a060
