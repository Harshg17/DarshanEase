const mongoose = require('mongoose');

const templeSchema = new mongoose.Schema({
  name: { type: String, required: true },
  location: { type: String, required: true },
  description: { type: String, required: true },
  
  imageUrl: { type: String }, 
  
  images: [{ type: String }] 
}, { timestamps: true });

module.exports = mongoose.model('Temple', templeSchema);
