import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import api from '../utils/api';
import { toast } from 'react-toastify';

const Home = () => {
  const [temples, setTemples] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  
  // Get user data from localStorage (or your Auth Context)
  const user = JSON.parse(localStorage.getItem('user')); 
  const navigate = useNavigate();

  useEffect(() => {
    const fetchTemples = async () => {
      try {
        const response = await api.get('/temples');
        setTemples(response.data);
        setLoading(false);
      } catch (err) {
        setError('Failed to load temples. Is the backend running?');
        setLoading(false);
      }
    };
    fetchTemples();
  }, []);

  // --- ADMIN ACTIONS ---
  const handleDelete = async (id) => {
    if (window.confirm("Are you sure? This will remove the temple and all associated slots.")) {
      try {
        await api.delete(`/temples/${id}`);
        toast.success("Temple deleted successfully");
        // Remove from local state so UI updates instantly
        setTemples(prev => prev.filter(t => t._id !== id));
      } catch (err) {
        toast.error(err.response?.data?.message || "Delete failed");
      }
    }
  };

  if (loading) {
    return (
      <div className="d-flex justify-content-center mt-5">
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    );
  }

  if (error) {
    return <div className="alert alert-danger mt-5 mx-auto text-center" style={{ maxWidth: '600px' }}>{error}</div>;
  }

  return (
    <div className="container mt-5">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2 className="fw-bold mb-0">Available Temples</h2>
        
        {/* Only show "Add Temple" to Admins */}
        {user?.role === 'ADMIN' && (
          <Link to="/admin/add-temple" className="btn btn-success shadow-sm">
            <i className="bi bi-plus-circle me-2"></i>Add New Temple
          </Link>
        )}
      </div>

      <div className="row">
        {temples.length === 0 ? (
          <p className="text-center text-muted">No temples available right now.</p>
        ) : (
          temples.map((temple) => (
            <div className="col-md-4 mb-4" key={temple._id}>
              <div className="card h-100 shadow-sm border-0">
                <img
                  src={temple.imageUrl || 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=1000&auto=format&fit=crop'}
                  className="card-img-top"
                  alt={temple.name}
                  style={{ 
                    height: '250px', 
                    objectFit: 'cover', 
                    width: '100%',
                    backgroundColor: '#f8f9fa' // Shows a light grey background while loading
                  }}
                  // THE FIX: This triggers if the URL is 404, blocked, or invalid
                  onError={(e) => {
                    e.target.onerror = null; // Prevents infinite loops
                    e.target.src = 'https://via.placeholder.com/400x300?text=Image+Unavailable';
                  }}
                />
                <div className="card-body d-flex flex-column">
                  <h5 className="card-title text-primary fw-bold">{temple.name}</h5>
                  <p className="card-text text-muted small mb-2">📍 {temple.location}</p>
                  <p className="card-text text-truncate mb-3">{temple.description}</p>
                  
                  <Link to={`/temple/${temple._id}`} className="btn btn-outline-primary mt-auto">
                    View Slots & Book
                  </Link>

                  {/* ADMIN CRUD BUTTONS */}
                  {user?.role === 'ADMIN' && (
                    <div className="mt-3 pt-3 border-top d-flex gap-2">
                      <button 
                        className="btn btn-sm btn-warning flex-grow-1"
                        onClick={() => navigate(`/admin/edit-temple/${temple._id}`)}
                      >
                        Edit
                      </button>
                      <button 
                        className="btn btn-sm btn-danger flex-grow-1"
                        onClick={() => handleDelete(temple._id)}
                      >
                        Delete
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default Home;