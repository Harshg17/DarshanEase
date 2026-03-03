const mongoose = require('mongoose');

const templeSchema = new mongoose.Schema({
  name: { type: String, required: true },
  location: { type: String, required: true },
  description: { type: String },
  // ADD THIS LINE BELOW TO HOLD THE IMAGE URL:
  imageUrl: { type: String, default: 'https://via.placeholder.com/400x250?text=No+Temple+Image' },
}, { timestamps: true });

module.exports = mongoose.model('Temple', templeSchema, 'temples');