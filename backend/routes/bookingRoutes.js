const express = require('express');
const router = express.Router();
const { bookTicket, getUserBookings, cancelBooking } = require('../controllers/bookingController');
const { verifyToken } = require('../middleware/authMiddleware');


router.post('/', verifyToken, bookTicket);
router.get('/my-bookings', verifyToken, getUserBookings);
router.put('/cancel/:id', verifyToken, cancelBooking);

module.exports = router;
