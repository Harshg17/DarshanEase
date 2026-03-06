import { useState } from 'react';
import api from '../../utils/api';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

const AddTemple = () => {
  const [formData, setFormData] = useState({
    name: '',
    location: '',
    description: '',
    imageUrls: '' // We'll collect this as a long string
  });
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      // Convert comma-separated string into a clean array of URLs
      const imagesArray = formData.imageUrls
        .split(',')
        .map(url => url.trim())
        .filter(url => url !== "");

      const payload = {
        ...formData,
        images: imagesArray, // Sending as 'images' array for the Carousel
        imageUrl: imagesArray[0] // Fallback for components still using single imageUrl
      };

      await api.post('/temples', payload);
      toast.success('Temple added successfully with gallery!');
      navigate('/');
    } catch (err) {
      toast.error(err.response?.data?.message || 'Failed to add temple');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-8">
          <div className="card shadow-lg border-0 rounded-4">
            <div className="card-body p-5">
              <h2 className="fw-bold text-center mb-4">Add New Temple</h2>
              
              <form onSubmit={handleSubmit}>
                <div className="mb-3">
                  <label className="form-label fw-bold">Temple Name</label>
                  <input 
                    type="text" className="form-control rounded-pill px-3"
                    placeholder="e.g. Kedarnath Temple"
                    required
                    onChange={(e) => setFormData({...formData, name: e.target.value})}
                  />
                </div>

                <div className="mb-3">
                  <label className="form-label fw-bold">Location</label>
                  <input 
                    type="text" className="form-control rounded-pill px-3"
                    placeholder="e.g. Uttarakhand, India"
                    required
                    onChange={(e) => setFormData({...formData, location: e.target.value})}
                  />
                </div>

                <div className="mb-3">
                  <label className="form-label fw-bold">Description</label>
                  <textarea 
                    className="form-control rounded-4 px-3" rows="3"
                    placeholder="Tell us about the temple's history and significance..."
                    required
                    onChange={(e) => setFormData({...formData, description: e.target.value})}
                  ></textarea>
                </div>

                <div className="mb-4">
                  <label className="form-label fw-bold">Image Gallery URLs (Comma Separated)</label>
                  <textarea 
                    className="form-control rounded-4 px-3" rows="3"
                    placeholder="Paste URLs here, separated by commas: https://link1.com, https://link2.com"
                    required
                    onChange={(e) => setFormData({...formData, imageUrls: e.target.value})}
                  ></textarea>
                  <div className="form-text text-muted">
                    Tip: The first URL will be the main thumbnail image.
                  </div>
                </div>

                <button 
                  type="submit" 
                  className="btn btn-warning w-100 rounded-pill fw-bold py-2 shadow-sm"
                  disabled={loading}
                >
                  {loading ? 'Adding Temple...' : 'Launch Temple Page'}
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddTemple;