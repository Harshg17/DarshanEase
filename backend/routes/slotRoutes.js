const express = require('express');
const router = express.Router();
// IMPORTANT: These names must match the controller exactly!
const { 
  getSlotsByTemple, 
  createSlot, 
  updateSlot, 
  deleteSlot 
} = require('../controllers/slotController');

const { verifyToken, isAdmin } = require('../middleware/authMiddleware');

// If line 12 is here, ensure 'getSlotsByTemple' is NOT undefined
router.get('/temple/:templeId', getSlotsByTemple);

// Admin Only
router.post('/', verifyToken, isAdmin, createSlot);
router.put('/:id', verifyToken, isAdmin, updateSlot);
router.delete('/:id', verifyToken, isAdmin, deleteSlot);

module.exports = router;