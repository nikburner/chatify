const express = require('express');
const router = express.Router();
const { createGroup, getGroups, getGroupById } = require('../controllers/groupController');
const { authenticateToken } = require('../utils/authMiddleware');

router.post('/', authenticateToken, createGroup); 
router.get('/', authenticateToken, getGroups); 
router.get('/:groupId', authenticateToken, getGroupById); 

module.exports = router;