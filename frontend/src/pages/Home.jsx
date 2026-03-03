import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import api from '../utils/api'; // Our custom Axios instance

const Home = () => {
  // 1. Set up our state variables
  const [temples, setTemples] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  // 2. Fetch data when the component mounts
  useEffect(() => {
    const fetchTemples = async () => {
      try {
        // We will build this backend route later!
        const response = await api.get('/temples'); 
        setTemples(response.data);
        setLoading(false);
      } catch (err) {
        setError('Failed to load temples. Is the backend running?');
        setLoading(false);
      }
    };

    fetchTemples();
  }, []); // The empty array [] means "only run this once when the page loads"

  // 3. What to show while waiting for the data
  if (loading) {
    return (
      <div className="d-flex justify-content-center mt-5">
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    );
  }

  // 4. What to show if the backend is down or throws an error
  if (error) {
    return <div className="alert alert-danger mt-5 mx-auto text-center" style={{ maxWidth: '600px' }}>{error}</div>;
  }

  // 5. The actual UI displaying the Bootstrap Cards
  return (
    <div className="container mt-5">
      <h2 className="mb-4 text-center fw-bold">Available Temples for Darshan</h2>
      <div className="row">
        {temples.length === 0 ? (
          <p className="text-center text-muted">No temples available right now. Please check back later.</p>
        ) : (
          temples.map((temple) => (
            <div className="col-md-4 mb-4" key={temple._id}>
              <div className="card h-100 shadow-sm border-0">
                {/* Fallback image if the temple doesn't have one */}
                <img
                  src={temple.imageUrl || 'https://via.placeholder.com/300x200?text=Temple+Image'}
                  className="card-img-top"
                  alt={temple.name}
                  style={{ height: '200px', objectFit: 'cover' }}
                />
                <div className="card-body d-flex flex-column">
                  <h5 className="card-title text-primary">{temple.name}</h5>
                  <p className="card-text text-muted small mb-2">
                    📍 {temple.location}
                  </p>
                  <p className="card-text text-truncate">{temple.description}</p>
                  
                  {/* Button pushes user to the specific temple's booking page */}
                  <Link to={`/temple/${temple._id}`} className="btn btn-outline-primary mt-auto">
                    View Slots & Book
                  </Link>
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