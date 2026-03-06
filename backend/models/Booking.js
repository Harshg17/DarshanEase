const mongoose = require('mongoose');

const bookingSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  templeId: { type: mongoose.Schema.Types.ObjectId, ref: 'Temple', required: true },
  slotId: { type: mongoose.Schema.Types.ObjectId, ref: 'DarshanSlot', required: true },
  numberOfTickets: { type: Number, default: 1 },
  status: { type: String, enum: ['BOOKED', 'CANCELLED'], default: 'BOOKED' }
}, { timestamps: true });


module.exports = mongoose.model('Booking', bookingSchema, 'bookings');
