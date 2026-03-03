import { useState, useEffect, useContext } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import api from '../utils/api';
import { AuthContext } from '../context/AuthContext';
import { toast } from 'react-toastify';

const TempleDetails = () => {
  const { id } = useParams();
  const { user } = useContext(AuthContext); // Check if user is logged in
  const navigate = useNavigate();
  
  const [temple, setTemple] = useState(null);
  const [slots, setSlots] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getTempleData = async () => {
      try {
        const templeRes = await api.get(`/temples/${id}`);
        setTemple(templeRes.data);
        
        // Fetch the slots we added in Compass
        const slotsRes = await api.get(`/slots/temple/${id}`);
        setSlots(slotsRes.data);

        setLoading(false);
      } catch (err) {
        toast.error('Could not fetch data');
        setLoading(false);
      }
    };
    getTempleData();
  }, [id]);

  const handleBooking = async (slotId) => {
    if (!user) {
      toast.warning('Please login to book tickets');
      return navigate('/login');
    }

    try {
      const bookingData = {
        templeId: id,
        slotId: slotId,
        numberOfTickets: 1 // For now, we book 1 ticket
      };

      await api.post('/bookings', bookingData);
      toast.success('Darshan Ticket Booked Successfully!');
      
      // Refresh slots to show updated ticket count
      const updatedSlots = await api.get(`/slots/temple/${id}`);
      setSlots(updatedSlots.data);
    } catch (err) {
      toast.error(err.response?.data?.message || 'Booking failed');
    }
  };

  if (loading) return <div className="text-center mt-5"><div className="spinner-border"></div></div>;

  return (
    <div className="container mt-5">
      <div className="row">
        <div className="col-md-6">
          <img src={temple?.imageUrl} alt={temple?.name} className="img-fluid rounded shadow" />
        </div>
        <div className="col-md-6">
          <h1 className="fw-bold">{temple?.name}</h1>
          <p className="text-muted">📍 {temple?.location}</p>
          <p>{temple?.description}</p>
          <hr />
          <h4>Select a Darshan Slot</h4>
          <div className="list-group mt-3">
            {slots.length > 0 ? (
              slots.map((slot) => (
                <div key={slot._id} className="list-group-item d-flex justify-content-between align-items-center mb-2 shadow-sm">
                  <div>
                    <h6 className="mb-0">{new Date(slot.date).toLocaleDateString()}</h6>
                    <small className="text-primary">{slot.time}</small>
                    <br />
                    <small className={slot.availableTickets > 0 ? "text-success" : "text-danger"}>
                      {slot.availableTickets} tickets left
                    </small>
                  </div>
                  <button 
                    className="btn btn-sm btn-success" 
                    onClick={() => handleBooking(slot._id)}
                    disabled={slot.availableTickets === 0}
                  >
                    {slot.availableTickets > 0 ? 'Book Now' : 'Full'}
                  </button>
                </div>
              ))
            ) : (
              <p className="text-muted">No slots found for this temple.</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TempleDetails;