const mongoose = require('mongoose');

const darshanSlotSchema = new mongoose.Schema({
  templeId: { type: mongoose.Schema.Types.ObjectId, ref: 'Temple', required: true },
  date: { type: Date, required: true },
  time: { type: String, required: true }, // e.g., "10:00 AM - 11:00 AM"
  totalCapacity: { type: Number, required: true },
  availableTickets: { type: Number, required: true }
}, { timestamps: true });

module.exports = mongoose.model('DarshanSlot', darshanSlotSchema);