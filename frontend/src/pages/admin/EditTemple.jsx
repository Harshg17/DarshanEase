import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import api from '../../utils/api';
import { toast } from 'react-toastify';

const EditTemple = () => {
  const { id } = useParams(); // Get the temple ID from the URL
  const navigate = useNavigate();
  
  const [formData, setFormData] = useState({
    name: '',
    location: '',
    description: '',
    imageUrl: ''
  });
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  // 1. Fetch the existing temple data to fill the form
  useEffect(() => {
    const fetchTemple = async () => {
      try {
        const res = await api.get(`/temples/${id}`);
        setFormData(res.data);
      } catch (err) {
        toast.error("Could not load temple data");
        navigate('/');
      } finally {
        setLoading(false);
      }
    };
    fetchTemple();
  }, [id, navigate]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    try {
      await api.put(`/temples/${id}`, formData);
      toast.success('Temple updated successfully!');
      navigate('/'); 
    } catch (err) {
      toast.error(err.response?.data?.message || 'Update failed');
    } finally {
      setSaving(false);
    }
  };

  if (loading) return <div className="text-center mt-5"><div className="spinner-border"></div></div>;

  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <div className="card shadow border-0 p-4">
            <h2 className="text-center fw-bold mb-4 text-warning">Edit Temple</h2>
            <form onSubmit={handleSubmit}>
              <div className="mb-3">
                <label className="form-label fw-bold">Temple Name</label>
                <input 
                  type="text" name="name" className="form-control" 
                  value={formData.name} required 
                  onChange={handleChange} 
                />
              </div>
              <div className="mb-3">
                <label className="form-label fw-bold">Location</label>
                <input 
                  type="text" name="location" className="form-control" 
                  value={formData.location} required 
                  onChange={handleChange} 
                />
              </div>
              <div className="mb-3">
                <label className="form-label fw-bold">Description</label>
                <textarea 
                  name="description" className="form-control" rows="4" 
                  value={formData.description} required 
                  onChange={handleChange}
                ></textarea>
              </div>
              <div className="mb-3">
                <label className="form-label fw-bold">Image URL</label>
                <input 
                  type="text" name="imageUrl" className="form-control" 
                  value={formData.imageUrl}
                  onChange={handleChange} 
                />
              </div>
              
              {/* Live Preview of the updated URL */}
              {formData.imageUrl && (
                <div className="mb-3">
                  <p className="small text-muted mb-1">New Image Preview:</p>
                  <img src={formData.imageUrl} alt="Preview" className="img-thumbnail" style={{ maxHeight: '150px' }} />
                </div>
              )}

              <div className="d-flex gap-2">
                <button type="button" className="btn btn-secondary w-50" onClick={() => navigate('/')}>
                  Cancel
                </button>
                <button type="submit" className="btn btn-warning w-50 fw-bold" disabled={saving}>
                  {saving ? 'Updating...' : 'Save Changes'}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditTemple;