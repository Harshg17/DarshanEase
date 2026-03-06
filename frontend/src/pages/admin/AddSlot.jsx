import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import api from '../../utils/api';
import { toast } from 'react-toastify';

const AddSlot = () => {
  const { id } = useParams(); // This is the templeId from the URL
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    date: '',
    time: '',
    availableTickets: 50 // Default value
  });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      // Combine the form data with the specific temple ID
      const payload = {
        templeId: id,
        date: formData.date,
        time: formData.time,
        availableTickets: Number(formData.availableTickets)
      };

      await api.post('/slots', payload);
      toast.success('Darshan slot scheduled successfully!');
      
      // Send the admin back to the temple details page to see the new slot
      navigate(`/temple/${id}`); 
    } catch (err) {
      toast.error(err.response?.data?.message || 'Failed to add slot');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <div className="card shadow-lg border-0 p-4 rounded-4">
            <h2 className="text-center fw-bold mb-4 text-success">
              <i className="bi bi-calendar-plus me-2"></i>Schedule Darshan
            </h2>
            
            <form onSubmit={handleSubmit}>
              <div className="mb-3">
                <label className="form-label fw-bold">Date</label>
                <input 
                  type="date" 
                  name="date" 
                  className="form-control form-control-lg" 
                  required 
                  value={formData.date}
                  onChange={handleChange} 
                  min={new Date().toISOString().split('T')[0]} // Prevents picking past dates
                />
              </div>

              <div className="mb-3">
                <label className="form-label fw-bold">Time</label>
                <input 
                  type="time" 
                  name="time" 
                  className="form-control form-control-lg" 
                  required 
                  value={formData.time}
                  onChange={handleChange} 
                />
                <div className="form-text">Example: 06:30 AM or 18:00</div>
              </div>

              <div className="mb-4">
                <label className="form-label fw-bold">Available Tickets</label>
                <input 
                  type="number" 
                  name="availableTickets" 
                  className="form-control form-control-lg" 
                  required 
                  min="1"
                  value={formData.availableTickets}
                  onChange={handleChange} 
                />
                <div className="form-text">How many pilgrims can book this specific time?</div>
              </div>

              <div className="d-flex gap-3">
                <button type="button" className="btn btn-light w-50 fw-bold" onClick={() => navigate(-1)}>
                  Cancel
                </button>
                <button type="submit" className="btn btn-success w-50 fw-bold shadow-sm" disabled={loading}>
                  {loading ? 'Saving...' : 'Create Slot'}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddSlot;