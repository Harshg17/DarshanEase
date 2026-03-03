const express = require('express');
const router = express.Router();
const { createSlot, getSlotsByTemple } = require('../controllers/slotController');
const { verifyToken, authorizeRoles } = require('../middleware/authMiddleware');

router.post('/', verifyToken, authorizeRoles('ADMIN', 'ORGANIZER'), createSlot);
router.get('/temple/:templeId', getSlotsByTemple);

module.exports = router;