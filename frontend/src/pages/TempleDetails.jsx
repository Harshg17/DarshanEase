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
    <div className="container mt-5 pb-5 overflow-hidden">
      <div className="row g-4 align-items-start">
        
        {/* LEFT COLUMN: AUTO-SCROLLING CAROUSEL */}
        <div className="col-lg-7" data-aos="fade-right">
          <div className="p-3 bg-white rounded-4 shadow-sm border">
            <div 
              id="templeCarousel" 
              className="carousel slide rounded-4 overflow-hidden shadow-sm" 
              data-bs-ride="carousel" 
              data-bs-interval="3000" /* Auto-scrolls every 3 seconds */
            >
              
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
                        style={{ height: '480px', objectFit: 'cover' }}
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
        <div className="col-lg-5" data-aos="fade-left">
          <div className="ps-lg-4">
            <nav aria-label="breadcrumb">
              <ol className="breadcrumb small">
                <li className="breadcrumb-item"><a href="/" className="text-decoration-none text-warning fw-bold">Home</a></li>
                <li className="breadcrumb-item active" aria-current="page">Temple Details</li>
              </ol>
            </nav>

            <h1 className="fw-bold text-dark mb-1 display-6">{temple?.name}</h1>
            <p className="text-muted mb-4 d-flex align-items-center">
              <i className="bi bi-geo-alt-fill text-danger me-2"></i>
              {temple?.location}
            </p>

            <div className="card border-0 bg-light rounded-4 mb-4 shadow-sm border-start border-warning border-4">
              <div className="card-body">
                <h6 className="fw-bold text-uppercase small text-secondary mb-2">Divine Heritage</h6>
                <p className="text-dark mb-0" style={{ lineHeight: '1.7' }}>{temple?.description}</p>
              </div>
            </div>
            
            <div className="d-flex justify-content-between align-items-center mb-3">
              <h5 className="fw-bold mb-0">Select Darshan Slot</h5>
              {user?.role === 'ADMIN' && (
                <button 
                  className="btn btn-sm btn-dark rounded-pill px-3 fw-bold shadow-sm"
                  onClick={() => navigate(`/admin/add-slot/${id}`)}
                >
                  <i className="bi bi-plus-lg me-1"></i> Add Slot
                </button>
              )}
            </div>

            <div className="slot-list pe-2" style={{ maxHeight: '450px', overflowY: 'auto' }}>
              {slots.length > 0 ? (
                slots.map((slot, index) => (
                  <div 
                    key={slot._id} 
                    className="card mb-3 border-0 shadow-sm hover-lift"
                    data-aos="fade-up"
                    data-aos-delay={index * 50}
                  >
                    <div className="card-body d-flex justify-content-between align-items-center py-3">
                      <div>
                        <div className="fw-bold text-dark small mb-1">
                          <i className="bi bi-calendar3 text-warning me-2"></i>
                          {new Date(slot.date).toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' })}
                        </div>
                        <div className="d-flex align-items-center">
                          <span className="h5 fw-bold mb-0 me-3">{slot.time}</span>
                          <span className={`badge rounded-pill ${slot.availableTickets < 10 ? 'bg-danger-subtle text-danger' : 'bg-success-subtle text-success'}`}>
                            {slot.availableTickets} left
                          </span>
                        </div>
                      </div>
                      
                      <div className="d-flex align-items-center gap-2">
                        <button 
                          className={`btn ${slot.availableTickets > 0 ? 'btn-warning' : 'btn-secondary'} px-4 rounded-pill btn-sm fw-bold shadow-sm`}
                          onClick={() => handleBooking(slot._id)}
                          disabled={slot.availableTickets === 0}
                        >
                          {slot.availableTickets > 0 ? 'Book Now' : 'Sold Out'}
                        </button>

                        {user?.role === 'ADMIN' && (
                          <button 
                            className="btn btn-sm text-danger hover-scale"
                            onClick={() => handleDeleteSlot(slot._id)}
                          >
                            <i className="bi bi-trash3-fill"></i>
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <div className="text-center p-5 bg-light rounded-4 border border-dashed border-2">
                  <i className="bi bi-calendar-x text-muted fs-1"></i>
                  <p className="text-muted mt-2">No Darshan slots available for this temple.</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      <style>{`
        .img-zoom {
          transition: transform 0.6s cubic-bezier(0.165, 0.84, 0.44, 1);
        }
        .img-zoom:hover {
          transform: scale(1.08);
        }
        .hover-lift {
          transition: transform 0.2s ease, box-shadow 0.2s ease;
        }
        .hover-lift:hover {
          transform: translateY(-3px);
          box-shadow: 0 5px 15px rgba(0,0,0,0.1) !important;
        }
        .hover-scale:hover {
          transform: scale(1.2);
          transition: transform 0.2s ease;
        }
        .slot-list::-webkit-scrollbar {
          width: 6px;
        }
        .slot-list::-webkit-scrollbar-thumb {
          background: #ff9933;
          border-radius: 10px;
        }
        .slot-list::-webkit-scrollbar-track {
          background: #f1f1f1;
        }
      `}</style>
    </div>
  );
};

export default TempleDetails;