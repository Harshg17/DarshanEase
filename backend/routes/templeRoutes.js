const express = require('express');
const router = express.Router();
const { verifyToken, isAdmin } = require('../middleware/authMiddleware');
const { 
  getAllTemples, 
  getTempleById, 
  createTemple, 
  updateTemple, 
  deleteTemple 
} = require('../controllers/templeController');

// Public Routes
router.get('/', getAllTemples);
router.get('/:id', getTempleById);

// Admin Only Routes
router.post('/', verifyToken, isAdmin, createTemple);
router.put('/:id', verifyToken, isAdmin, updateTemple);
router.delete('/:id', verifyToken, isAdmin, deleteTemple);

module.exports = router;