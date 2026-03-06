const DarshanSlot = require('../models/DarshanSlot');

exports.getSlotsByTemple = async (req, res) => { 
  try {
    const slots = await DarshanSlot.find({ templeId: req.params.templeId });
    res.status(200).json(slots);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching slots' });
  }
};


exports.createSlot = async (req, res) => {
  try {
    const { templeId, date, time, availableTickets } = req.body;
    const newSlot = new DarshanSlot({ templeId, date, time, availableTickets });
    await newSlot.save();
    res.status(201).json({ message: 'Slot added successfully', slot: newSlot });
  } catch (error) {
    res.status(500).json({ message: 'Error adding slot', error: error.message });
  }
};


exports.updateSlot = async (req, res) => {
  try {
    const updatedSlot = await DarshanSlot.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    res.status(200).json(updatedSlot);
  } catch (error) {
    res.status(500).json({ message: 'Update failed', error: error.message });
  }
};


exports.deleteSlot = async (req, res) => {
  try {
    await DarshanSlot.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: 'Slot removed' });
  } catch (error) {
    res.status(500).json({ message: 'Delete failed', error: error.message });
  }
};
