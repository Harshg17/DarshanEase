import React, { useState, useEffect } from 'react';
import api from '../utils/api';
import { toast } from 'react-toastify';
import { Link } from 'react-router-dom';

const MyBookings = () => {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);

  // FETCH ALL BOOKINGS
  useEffect(() => {
    const fetchMyBookings = async () => {
      try {
        const res = await api.get('/bookings/my-bookings');
        setBookings(res.data);
      } catch (err) {
        toast.error('Failed to load your tickets.');
      } finally {
        setLoading(false);
      }
    };
    fetchMyBookings();
  }, []);

  // CANCEL A BOOKING
  const handleCancel = async (bookingId) => {
    // 1. Ask for confirmation before modifying the database
    if (window.confirm("Are you sure you want to cancel this darshan ticket?")) {
      try {
         // 2. Call our newly completed PUT route
         await api.put(`/bookings/cancel/${bookingId}`);
         toast.success('Booking successfully cancelled!');
         
         // 3. Update the state dynamically so we don't need to refresh the page!
         setBookings(prevBookings => prevBookings.map(booking => 
            booking._id === bookingId ? { ...booking, status: 'CANCELLED' } : booking
         ));

      } catch (err) {
         toast.error(err.response?.data?.message || 'Cancellation failed');
      }
    }
  };

  if (loading) return <div className="text-center mt-5"><div className="spinner-border text-primary"></div></div>;

  return (
    <div className="container mt-5 pb-5">
      <h2 className="mb-4 text-primary fw-bold">My Darshan Tickets</h2>
      
      {bookings.length === 0 ? (
        <div className="alert alert-secondary shadow-sm">
          You haven't booked any darshan slots yet. <Link to="/" className="alert-link text-primary">Browse Temples</Link>
        </div>
      ) : (
        <div className="row g-4">
          {bookings.map((booking) => (
            <div className="col-md-6" key={booking._id}>
              {/* Dynamic styling: Grey out the card slightly if it's cancelled */}
              <div className={`card shadow-lg h-100 border-0 rounded-3 ${booking.status === 'CANCELLED' ? 'opacity-75' : ''}`}>
                <div className="card-header bg-primary text-white d-flex justify-content-between align-items-center">
                   <h5 className="mb-0">{booking.templeId?.name || "Temple Unavailable"}</h5>
                   <span className="badge bg-light text-primary border rounded-pill">ID: {booking._id.slice(-5).toUpperCase()}</span>
                </div>
                <div className="card-body bg-light text-dark">
                  <h6 className="text-muted mb-3"><i className="bi bi-geo-alt-fill text-danger"></i> {booking.templeId?.location || "Location Unavailable"}</h6>
                  <hr/>
                  <div className="d-flex justify-content-between mb-3">
                     <span><strong>Date:</strong> {booking.slotId?.date ? new Date(booking.slotId.date).toLocaleDateString() : 'N/A'}</span>
                     <span><strong>Time:</strong> {booking.slotId?.time || 'N/A'}</span>
                  </div>
                  
                  {/* Dynamic Status Badge */}
                  <div className="d-flex justify-content-between align-items-center">
                      <p className="mb-0">
                          <strong>Status:</strong> 
                          <span className={`ms-2 badge ${booking.status === 'BOOKED' ? 'bg-success' : 'bg-danger'}`}>
                              {booking.status}
                          </span>
                      </p>
                      <p className="mb-0 text-muted small"><strong>Tickets:</strong> {booking.numberOfTickets}</p>
                  </div>
                </div>
                <div className="card-footer bg-white border-0 text-center pb-3 pt-3">
                     
                     {/* The functional cancel button! */}
                     {booking.status === 'BOOKED' ? (
                         <button 
                             onClick={() => handleCancel(booking._id)} 
                             className="btn btn-outline-danger w-100 fw-bold"
                         >
                             Cancel Booking
                         </button>
                     ) : (
                         <button className="btn btn-secondary w-100 disabled text-white fw-bold">
                             <i className="bi bi-x-circle me-2"></i> Cancelled
                         </button>
                     )}

                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MyBookings;