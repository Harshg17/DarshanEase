import { useState, useEffect, useContext } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import api from '../utils/api';
import { AuthContext } from '../context/AuthContext';
import { toast } from 'react-toastify';

const TempleDetails = () => {
  const { id } = useParams();
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();
  
  const [temple, setTemple] = useState(null);
  const [slots, setSlots] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getTempleData = async () => {
      try {
        const templeRes = await api.get(`/temples/${id}`);
        setTemple(templeRes.data);
        const slotsRes = await api.get(`/slots/temple/${id}`);
        setSlots(slotsRes.data);
      } catch (err) {
        toast.error('Could not fetch data');
      } finally {
        setLoading(false);
      }
    };
    getTempleData();
  }, [id]);

  const handleImageError = (e) => {
    e.target.onerror = null; 
    e.target.src = 'https://via.placeholder.com/600x400?text=Temple+Image+Not+Available';
  };

  const handleBooking = async (slotId) => {
    if (!user) {
      toast.warning('Please login to book tickets');
      return navigate('/login');
    }
    try {
      const bookingData = { templeId: id, slotId, numberOfTickets: 1 };
      await api.post('/bookings', bookingData);
      toast.success('Darshan Ticket Booked Successfully!');
      const updatedSlots = await api.get(`/slots/temple/${id}`);
      setSlots(updatedSlots.data);
    } catch (err) {
      toast.error(err.response?.data?.message || 'Booking failed');
    }
  };

  // --- ADMIN ACTION: DELETE SLOT ---
  const handleDeleteSlot = async (slotId) => {
    if (window.confirm("Remove this darshan time slot permanently?")) {
      try {
        await api.delete(`/slots/${slotId}`);
        toast.success("Slot removed");
        setSlots(prev => prev.filter(s => s._id !== slotId));
      } catch (err) {
        toast.error("Failed to delete slot");
      }
    }
  };

  if (loading) return (
    <div className="d-flex justify-content-center align-items-center" style={{height: '80vh'}}>
      <div className="spinner-grow text-primary" role="status"></div>
    </div>
  );

  return (
    <div className="container mt-5">
      <div className="row g-4">
        <div className="col-md-6">
          <div className="position-relative overflow-hidden rounded shadow-lg bg-light" style={{ minHeight: '350px' }}>
            <img 
              src={temple?.imageUrl || 'https://via.placeholder.com/600x400?text=No+Image+Provided'} 
              alt={temple?.name} 
              className="img-fluid w-100 h-100" 
              style={{ objectFit: 'cover', minHeight: '350px' }}
              onError={handleImageError}
            />
          </div>
        </div>

        <div className="col-md-6">
          <div className="p-3">
            <h1 className="fw-bold text-primary display-5">{temple?.name}</h1>
            <p className="text-muted fs-5">📍 {temple?.location}</p>
            <p className="lead">{temple?.description}</p>
            
            <hr className="my-4" />
            
            <div className="d-flex justify-content-between align-items-center mb-3">
              <h4 className="fw-bold mb-0">Darshan Slots</h4>
              {/* ADMIN ACTION: Add Slot Button */}
              {user?.role === 'ADMIN' && (
                <button 
                  className="btn btn-sm btn-success rounded-pill px-3"
                  onClick={() => navigate(`/admin/add-slot/${id}`)}
                >
                  + Add Slot
                </button>
              )}
            </div>

            <div className="list-group">
              {slots.length > 0 ? (
                slots.map((slot) => (
                  <div key={slot._id} className="list-group-item d-flex justify-content-between align-items-center p-3 mb-2 border-0 shadow-sm rounded">
                    <div>
                      <h6 className="mb-1 fw-bold">{new Date(slot.date).toLocaleDateString()}</h6>
                      <span className="badge bg-primary-subtle text-primary border border-primary-subtle px-3">{slot.time}</span>
                      <p className="mb-0 mt-1 small text-muted">
                        {slot.availableTickets} tickets remaining
                      </p>
                    </div>
                    <div className="d-flex gap-2">
                      <button 
                        className={`btn ${slot.availableTickets > 0 ? 'btn-success' : 'btn-secondary'} px-3 rounded-pill btn-sm`}
                        onClick={() => handleBooking(slot._id)}
                        disabled={slot.availableTickets === 0}
                      >
                        {slot.availableTickets > 0 ? 'Book' : 'Full'}
                      </button>

                      {/* ADMIN ACTION: Delete Icon */}
                      {user?.role === 'ADMIN' && (
                        <button 
                          className="btn btn-sm btn-outline-danger border-0"
                          onClick={() => handleDeleteSlot(slot._id)}
                        >
                          <i className="bi bi-trash"></i>
                        </button>
                      )}
                    </div>
                  </div>
                ))
              ) : (
                <div className="alert alert-info">No slots scheduled.</div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TempleDetails;