const express = require('express');
const router = express.Router();
<<<<<<< HEAD
const { createGroup, getGroups, getGroupById } = require('../controllers/groupController');
const { authenticateToken } = require('../utils/authMiddleware');

router.post('/', authenticateToken, createGroup); 
router.get('/', authenticateToken, getGroups); 
router.get('/:groupId', authenticateToken, getGroupById); 

module.exports = router;
=======
const { createGroup } = require('../controllers/groupController');
const { authenticateToken } = require('../utils/authMiddleware');

router.post('/', createGroup);

module.exports = router;
>>>>>>> 268b1808510ad8ec53727b2f3504d27760b2a060
