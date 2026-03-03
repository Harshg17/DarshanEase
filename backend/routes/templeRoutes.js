const express = require('express');
const router = express.Router();
const { 
  getAllTemples, 
  getTempleById, 
  createTemple, 
  updateTemple, 
  deleteTemple 
} = require('../controllers/templeController');
const { verifyToken, authorizeRoles } = require('../middleware/authMiddleware');

// Public routes (Anyone can view temples)
router.get('/', getAllTemples);
router.get('/:id', getTempleById);

// Protected Administration Routes
// Only ADMIN and ORGANIZER can Create or Edit
router.post('/', verifyToken, authorizeRoles('ADMIN', 'ORGANIZER'), createTemple);
router.put('/:id', verifyToken, authorizeRoles('ADMIN', 'ORGANIZER'), updateTemple);

// Only ADMIN can Delete
router.delete('/:id', verifyToken, authorizeRoles('ADMIN'), deleteTemple);

module.exports = router;