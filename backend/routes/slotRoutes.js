const express = require('express');
const router = express.Router();

const { 
  getSlotsByTemple, 
  createSlot, 
  updateSlot, 
  deleteSlot 
} = require('../controllers/slotController');

const { verifyToken, isAdmin } = require('../middleware/authMiddleware');


router.get('/temple/:templeId', getSlotsByTemple);


router.post('/', verifyToken, isAdmin, createSlot);
router.put('/:id', verifyToken, isAdmin, updateSlot);
router.delete('/:id', verifyToken, isAdmin, deleteSlot);

module.exports = router;
