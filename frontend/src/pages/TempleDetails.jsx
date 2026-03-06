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
        const [templeRes, slotsRes] = await Promise.all([
          api.get(`/temples/${id}`),
          api.get(`/slots/temple/${id}`)
        ]);
        setTemple(templeRes.data);
        setSlots(slotsRes.data);
      } catch (err) {
        toast.error('Could not fetch data');
      } finally {
        setLoading(false);
      }
    };
    getTempleData();
  }, [id]);

  const handleBooking = async (slotId) => {
    if (!user) {
      toast.warning('Please login to book tickets');
      return; 
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
      <div className="spinner-grow text-warning" role="status"></div>
    </div>
  );

  const imageGallery = temple?.images?.length > 0 ? temple.images : [temple?.imageUrl];

  return (
    <div className="container mt-5 pb-5">
      <div className="row g-4 align-items-start">
        
        {/* LEFT COLUMN: CAROUSEL WITH PADDING & ZOOM */}
        <div className="col-lg-7">
          <div className="p-3 bg-white rounded-4 shadow-sm border">
            <div id="templeCarousel" className="carousel slide rounded-4 overflow-hidden" data-bs-ride="carousel">
              
              {imageGallery.length > 1 && (
                <div className="carousel-indicators">
                  {imageGallery.map((_, index) => (
                    <button 
                      key={index}
                      type="button" 
                      data-bs-target="#templeCarousel" 
                      data-bs-slide-to={index} 
                      className={index === 0 ? 'active' : ''}
                    ></button>
                  ))}
                </div>
              )}

              <div className="carousel-inner bg-light">
                {imageGallery.map((img, index) => (
                  <div key={index} className={`carousel-item ${index === 0 ? 'active' : ''}`}>
                    <div className="overflow-hidden">
                      <img 
                        src={img || 'https://via.placeholder.com/800x500?text=No+Image+Available'} 
                        className="d-block w-100 img-zoom" 
                        alt="Temple"
                        style={{ height: '480px', objectFit: 'cover', transition: 'transform 0.5s ease' }}
                      />
                    </div>
                  </div>
                ))}
              </div>

              {imageGallery.length > 1 && (
                <>
                  <button className="carousel-control-prev" type="button" data-bs-target="#templeCarousel" data-bs-slide="prev">
                    <span className="carousel-control-prev-icon p-3 bg-dark rounded-circle bg-opacity-25" aria-hidden="true"></span>
                  </button>
                  <button className="carousel-control-next" type="button" data-bs-target="#templeCarousel" data-bs-slide="next">
                    <span className="carousel-control-next-icon p-3 bg-dark rounded-circle bg-opacity-25" aria-hidden="true"></span>
                  </button>
                </>
              )}
            </div>
          </div>
        </div>

        {/* RIGHT COLUMN: INFO & SLOTS */}
        <div className="col-lg-5">
          <div className="ps-lg-4">
            <nav aria-label="breadcrumb">
              <ol className="breadcrumb small">
                <li className="breadcrumb-item"><a href="/" className="text-decoration-none text-warning">Home</a></li>
                <li className="breadcrumb-item active" aria-current="page">Temple Details</li>
              </ol>
            </nav>

            <h1 className="fw-bold text-dark mb-1">{temple?.name}</h1>
            <p className="text-muted mb-4 d-flex align-items-center">
              <i className="bi bi-geo-alt-fill text-danger me-2"></i>
              {temple?.location}
            </p>

            <div className="card border-0 bg-light rounded-4 mb-4">
              <div className="card-body">
                <h6 className="fw-bold text-uppercase small text-secondary mb-2">About this Temple</h6>
                <p className="text-dark mb-0" style={{ lineHeight: '1.6' }}>{temple?.description}</p>
              </div>
            </div>
            
            <div className="d-flex justify-content-between align-items-center mb-3">
              <h5 className="fw-bold mb-0">Available Darshan Slots</h5>
              {user?.role === 'ADMIN' && (
                <button 
                  className="btn btn-sm btn-outline-warning rounded-pill px-3 fw-bold"
                  onClick={() => navigate(`/admin/add-slot/${id}`)}
                >
                  <i className="bi bi-plus-lg me-1"></i> Add Slot
                </button>
              )}
            </div>

            <div className="slot-list pe-2" style={{ maxHeight: '450px', overflowY: 'auto' }}>
              {slots.length > 0 ? (
                slots.map((slot) => (
                  <div key={slot._id} className="card mb-3 border-0 shadow-sm border-start border-warning border-4">
                    <div className="card-body d-flex justify-content-between align-items-center py-2">
                      <div>
                        <div className="fw-bold text-dark mb-0">
                          {new Date(slot.date).toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' })}
                        </div>
                        <div className="badge bg-warning text-dark me-2">{slot.time}</div>
                        <span className="small text-muted">{slot.availableTickets} left</span>
                      </div>
                      
                      <div className="d-flex gap-2">
                        <button 
                          className={`btn ${slot.availableTickets > 0 ? 'btn-dark' : 'btn-secondary'} px-3 rounded-pill btn-sm fw-bold`}
                          onClick={() => handleBooking(slot._id)}
                          disabled={slot.availableTickets === 0}
                        >
                          {slot.availableTickets > 0 ? 'Book' : 'Full'}
                        </button>

                        {user?.role === 'ADMIN' && (
                          <button 
                            className="btn btn-sm text-danger"
                            onClick={() => handleDeleteSlot(slot._id)}
                          >
                            <i className="bi bi-trash3"></i>
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <div className="text-center p-5 bg-light rounded-4 border border-dashed">
                  <p className="text-muted mb-0">No slots found for this temple.</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* CUSTOM CSS FOR ZOOM EFFECT */}
      <style>{`
        .img-zoom:hover {
          transform: scale(1.1);
        }
        .slot-list::-webkit-scrollbar {
          width: 5px;
        }
        .slot-list::-webkit-scrollbar-thumb {
          background: #ff9933;
          border-radius: 10px;
        }
      `}</style>
    </div>
  );
};

export default TempleDetails;