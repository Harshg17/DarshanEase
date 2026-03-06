const Temple = require('../models/Temple');



exports.getAllTemples = async (req, res) => {
  try {
    const temples = await Temple.find();
    res.status(200).json(temples);
  } catch (error) {
    res.status(500).json({ message: 'Server Error fetching temples', error: error.message });
  }
};



exports.getTempleById = async (req, res) => {
  try {
    const temple = await Temple.findById(req.params.id);
    if (!temple) return res.status(404).json({ message: 'Temple not found' });
    res.status(200).json(temple);
  } catch (error) {
    res.status(500).json({ message: 'Server Error fetching temple', error: error.message });
  }
};



exports.createTemple = async (req, res) => {
  try {
    const { name, location, description, images, imageUrl } = req.body;
    
    const newTemple = new Temple({
      name,
      location,
      description,
      images, 
      imageUrl: imageUrl || images[0] 
    });

    await newTemple.save();
    res.status(201).json(newTemple);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};



exports.updateTemple = async (req, res) => {
  try {
    const temple = await Temple.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!temple) return res.status(404).json({ message: 'Temple not found' });
    res.status(200).json(temple);
  } catch (error) {
    res.status(500).json({ message: 'Error updating temple', error: error.message });
  }
};



exports.deleteTemple = async (req, res) => {
  try {
    const deletedTemple = await Temple.findByIdAndDelete(req.params.id);
    if (!deletedTemple) return res.status(404).json({ message: 'Temple not found' });
    res.status(200).json({ message: 'Temple deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Server Error deleting temple', error: error.message });
  }
};
