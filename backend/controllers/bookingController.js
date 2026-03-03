const Booking = require('../models/Booking');
const DarshanSlot = require('../models/DarshanSlot');

// Create a new booking
exports.bookTicket = async (req, res) => {
  try {
    const { templeId, slotId, numberOfTickets } = req.body;
    const userId = req.user.id; // This comes from your verifyToken middleware

    // 1. Check if the slot exists
    const slot = await DarshanSlot.findById(slotId);
    if (!slot) {
      return res.status(404).json({ message: 'Slot not found' });
    }

    // 2. Check ticket availability
    if (slot.availableTickets < numberOfTickets) {
      return res.status(400).json({ message: 'Not enough tickets available' });
    }

    // 3. Create the booking entry
    const newBooking = new Booking({
      userId,
      templeId,
      slotId,
      numberOfTickets
    });

    // 4. Update the slot capacity (Decrease available tickets)
    console.log("1. Attempting to save booking...");
    await newBooking.save(); 
    console.log("2. ✅ Booking saved successfully!");

    await DarshanSlot.findByIdAndUpdate(slotId, { $inc: { availableTickets: -numberOfTickets } });
    console.log("3. ✅ Slot tickets updated!");

    res.status(201).json({ message: 'Booking confirmed!', booking: newBooking });
  } catch (error) {
    console.error("Booking Error:", error);
    res.status(500).json({ message: 'Server error during booking', error: error.message });
  }
};

// ==========================================
// NEW: Fetch all bookings for a user
// ==========================================
exports.getUserBookings = async (req, res) => {
  try {
    const userId = req.user.id; 

    // Find all bookings for this user.
    // We populate 'templeId' and 'slotId' to get their details (name, date, time) 
    // instead of just returning the raw IDs.
    const bookings = await Booking.find({ userId })
      .populate('templeId', 'name location imageUrl') 
      .populate('slotId', 'date time')
      .sort({ createdAt: -1 }); // Sort by newest first

    res.status(200).json(bookings);
  } catch (error) {
    console.error("Error fetching user bookings:", error);
    res.status(500).json({ message: 'Failed to fetch bookings', error: error.message });
  }
};


// Cancel an existing booking
exports.cancelBooking = async (req, res) => {
  try {
    const userId = req.user.id; 
    const bookingId = req.params.id; // We'll get this from the URL path

    // 1. First, make sure the booking exists and belongs to this user
    const booking = await Booking.findOne({ _id: bookingId, userId });
    
    if (!booking) {
      return res.status(404).json({ message: 'Booking not found or not authorized' });
    }

    if (booking.status === 'CANCELLED') {
      return res.status(400).json({ message: 'Booking is already cancelled' });
    }

    // 2. We don't delete the record; we update its status so they have a history!
    booking.status = 'CANCELLED';
    await booking.save();

    // 3. Atomically add the tickets back to the Temple's Darshan Slot!
    await DarshanSlot.findByIdAndUpdate(booking.slotId, {
       $inc: { availableTickets: booking.numberOfTickets } 
    });

    res.status(200).json({ message: 'Booking cancelled successfully', booking });
  } catch (error) {
    console.error("Cancellation Error:", error);
    res.status(500).json({ message: 'Error cancelling booking', error: error.message });
  }
};