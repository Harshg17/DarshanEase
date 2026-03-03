const Temple = require('../models/Temple');

// @route   GET /api/temples
// @desc    Get all temples (Public)
exports.getAllTemples = async (req, res) => {
  try {
    const temples = await Temple.find();
    res.status(200).json(temples);
  } catch (error) {
    res.status(500).json({ message: 'Server Error fetching temples', error: error.message });
  }
};

// @route   GET /api/temples/:id
// @desc    Get a single temple by ID (Public)
exports.getTempleById = async (req, res) => {
  try {
    const temple = await Temple.findById(req.params.id);
    if (!temple) return res.status(404).json({ message: 'Temple not found' });
    res.status(200).json(temple);
  } catch (error) {
    res.status(500).json({ message: 'Server Error fetching temple', error: error.message });
  }
};

// @route   POST /api/temples
// @desc    Create a new temple (Admin/Organizer Only)
exports.createTemple = async (req, res) => {
  try {
    const { name, location, description, imageUrl } = req.body;
    const newTemple = new Temple({ name, location, description, imageUrl });
    await newTemple.save();
    res.status(201).json(newTemple);
  } catch (error) {
    res.status(500).json({ message: 'Server Error creating temple', error: error.message });
  }
};

// @route   PUT /api/temples/:id
// @desc    Update a temple (Admin/Organizer Only)
exports.updateTemple = async (req, res) => {
  try {
    const updatedTemple = await Temple.findByIdAndUpdate(
      req.params.id, 
      req.body, 
      { new: true, runValidators: true } // Returns the updated document
    );
    if (!updatedTemple) return res.status(404).json({ message: 'Temple not found' });
    res.status(200).json(updatedTemple);
  } catch (error) {
    res.status(500).json({ message: 'Server Error updating temple', error: error.message });
  }
};

// @route   DELETE /api/temples/:id
// @desc    Delete a temple (Admin Only)
exports.deleteTemple = async (req, res) => {
  try {
    const deletedTemple = await Temple.findByIdAndDelete(req.params.id);
    if (!deletedTemple) return res.status(404).json({ message: 'Temple not found' });
    res.status(200).json({ message: 'Temple deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Server Error deleting temple', error: error.message });
  }
};