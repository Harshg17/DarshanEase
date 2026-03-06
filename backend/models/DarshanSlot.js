const mongoose = require('mongoose');

const darshanSlotSchema = new mongoose.Schema({
  // Make sure this matches what we send from the frontend!
  templeId: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'Temple', 
    required: true 
  },
  date: { type: Date, required: true },
  time: { type: String, required: true },
  availableTickets: { type: Number, required: true, default: 50 }
});

module.exports = mongoose.model('DarshanSlot', darshanSlotSchema);