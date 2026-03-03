const DarshanSlot = require('../models/DarshanSlot');

// Create a new slot (Admin/Organizer Only)
exports.createSlot = async (req, res) => {
  try {
    const { templeId, date, time, totalCapacity } = req.body;
    const newSlot = new DarshanSlot({
      templeId,
      date,
      time,
      totalCapacity,
      availableTickets: totalCapacity // Initially, all tickets are available
    });
    await newSlot.save();
    res.status(201).json(newSlot);
  } catch (error) {
    res.status(500).json({ message: 'Error creating slot', error: error.message });
  }
};

// Get all slots for a specific temple (Public)
exports.getSlotsByTemple = async (req, res) => {
  try {
    const slots = await DarshanSlot.find({ templeId: req.params.templeId });
    res.status(200).json(slots);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching slots', error: error.message });
  }
};