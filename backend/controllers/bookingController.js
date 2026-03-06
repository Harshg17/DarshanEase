const Booking = require('../models/Booking');
const DarshanSlot = require('../models/DarshanSlot');


exports.bookTicket = async (req, res) => {
  try {
    const { templeId, slotId, numberOfTickets } = req.body;
    const userId = req.user.id; 

    
    const slot = await DarshanSlot.findById(slotId);
    if (!slot) {
      return res.status(404).json({ message: 'Slot not found' });
    }

    
    if (slot.availableTickets < numberOfTickets) {
      return res.status(400).json({ message: 'Not enough tickets available' });
    }

    
    const newBooking = new Booking({
      userId,
      templeId,
      slotId,
      numberOfTickets
    });

    
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




exports.getUserBookings = async (req, res) => {
  try {
    const userId = req.user.id; 

    
    
    
    const bookings = await Booking.find({ userId })
      .populate('templeId', 'name location imageUrl') 
      .populate('slotId', 'date time')
      .sort({ createdAt: -1 }); 

    res.status(200).json(bookings);
  } catch (error) {
    console.error("Error fetching user bookings:", error);
    res.status(500).json({ message: 'Failed to fetch bookings', error: error.message });
  }
};



exports.cancelBooking = async (req, res) => {
  try {
    const userId = req.user.id; 
    const bookingId = req.params.id; 

    
    const booking = await Booking.findOne({ _id: bookingId, userId });
    
    if (!booking) {
      return res.status(404).json({ message: 'Booking not found or not authorized' });
    }

    if (booking.status === 'CANCELLED') {
      return res.status(400).json({ message: 'Booking is already cancelled' });
    }

    
    booking.status = 'CANCELLED';
    await booking.save();

    
    await DarshanSlot.findByIdAndUpdate(booking.slotId, {
       $inc: { availableTickets: booking.numberOfTickets } 
    });

    res.status(200).json({ message: 'Booking cancelled successfully', booking });
  } catch (error) {
    console.error("Cancellation Error:", error);
    res.status(500).json({ message: 'Error cancelling booking', error: error.message });
  }
};
