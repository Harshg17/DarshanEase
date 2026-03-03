import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../../utils/api';
import { toast } from 'react-toastify';

const AddTemple = () => {
  const [formData, setFormData] = useState({
    name: '',
    location: '',
    description: '',
    imageUrl: ''
  });
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await api.post('/temples', formData);
      toast.success('Temple added successfully!');
      navigate('/'); // Go back to home to see the new temple
    } catch (err) {
      toast.error(err.response?.data?.message || 'Failed to add temple');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <div className="card shadow border-0 p-4">
            <h2 className="text-center fw-bold mb-4 text-primary">Add New Temple</h2>
            <form onSubmit={handleSubmit}>
              <div className="mb-3">
                <label className="form-label fw-bold">Temple Name</label>
                <input 
                  type="text" name="name" className="form-control" 
                  placeholder="e.g. Somnath Temple" required 
                  onChange={handleChange} 
                />
              </div>
              <div className="mb-3">
                <label className="form-label fw-bold">Location</label>
                <input 
                  type="text" name="location" className="form-control" 
                  placeholder="e.g. Gujarat, India" required 
                  onChange={handleChange} 
                />
              </div>
              <div className="mb-3">
                <label className="form-label fw-bold">Description</label>
                <textarea 
                  name="description" className="form-control" rows="3" 
                  placeholder="Brief history or details..." required 
                  onChange={handleChange}
                ></textarea>
              </div>
              <div className="mb-3">
                <label className="form-label fw-bold">Image URL</label>
                <input 
                  type="text" name="imageUrl" className="form-control" 
                  placeholder="https://example.com/image.jpg" 
                  onChange={handleChange} 
                />
                <div className="form-text mt-2">
                  Find an image online, right-click it, and select "Copy Image Address".
                </div>
              </div>
              
              {/* Image Preview */}
              {formData.imageUrl && (
                <div className="mb-3">
                  <p className="small text-muted mb-1">Preview:</p>
                  <img src={formData.imageUrl} alt="Preview" className="img-thumbnail" style={{ maxHeight: '150px' }} />
                </div>
              )}

              <button type="submit" className="btn btn-primary w-100 fw-bold" disabled={loading}>
                {loading ? 'Saving...' : 'Create Temple'}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddTemple;