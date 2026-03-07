import React, { useState, useEffect, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import api from '../utils/api';
import { AuthContext } from '../context/AuthContext';
import { toast } from 'react-toastify';

const Home = () => {
  const [temples, setTemples] = useState([]);
  const [loading, setLoading] = useState(true);
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchTemples = async () => {
      try {
        const response = await api.get('/temples');
        setTemples(response.data);
      } catch (err) {
        toast.error('Failed to load temples.');
      } finally {
        setLoading(false);
      }
    };
    fetchTemples();
  }, []);

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure? This will remove the temple and all associated slots.")) {
      try {
        await api.delete(`/temples/${id}`);
        toast.success("Temple removed");
        setTemples(prev => prev.filter(t => t._id !== id));
      } catch (err) {
        toast.error("Delete failed");
      }
    }
  };

  if (loading) {
    return (
      <div className="d-flex justify-content-center align-items-center" style={{ height: '80vh' }}>
        <div className="spinner-grow text-warning" role="status"></div>
      </div>
    );
  }

  return (
    <div className="overflow-hidden">
      {/* 1. HERO SECTION (EDGE-TO-EDGE) */}
      <div 
        className="hero-wrapper d-flex align-items-center text-white" 
        style={{ 
          backgroundImage: 'linear-gradient(rgba(0,0,0,0.5), rgba(0,0,0,0.7)), url("https://dandapani.org/cdn-cgi/image/onerror=redirect,width=2880,height=1062,format=png/_astro/hero-desktop.B8H69DTE.jpg")', 
          backgroundSize: 'cover', 
          backgroundPosition: 'center', 
          minHeight: '85vh',
          marginTop: '-100px', // Pushes Hero behind the transparent Navbar
          paddingTop: '100px'
        }}
      >
        <div className="container" data-aos="zoom-out">
          <div className="row justify-content-center text-center">
            <div className="col-lg-9">
              <h1 className="display-2 fw-bold mb-3">Experience Divine Peace</h1>
              <p className="lead fs-4 mb-5 opacity-90">Book your Darshan slots at India's most sacred temples with ease and devotion.</p>
              <a href="#temples" className="btn btn-warning btn-lg rounded-pill px-5 fw-bold shadow-lg transition-all border-0">
                Explore Temples
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* 2. TEMPLE SECTION (CENTERED CONTENT) */}
      <div className="container py-5 mt-5" id="temples">
        
        {/* SECTION HEADER */}
        <div className="row mb-5 align-items-end" data-aos="fade-up">
          <div className="col-md-8">
            <h2 className="display-5 fw-bold text-dark mb-0">Sacred Destinations</h2>
            <div className="bg-warning rounded-pill mt-2 mb-3" style={{ width: '80px', height: '5px' }}></div>
            <p className="text-muted fs-5">Choose a temple to begin your spiritual journey.</p>
          </div>
          
          {user?.role === 'ADMIN' && (
            <div className="col-md-4 text-md-end">
              <Link to="/admin/add-temple" className="btn btn-dark rounded-pill px-4 shadow-sm mb-2">
                <i className="bi bi-plus-circle me-2"></i>Add Temple
              </Link>
            </div>
          )}
        </div>

        {/* 3. TEMPLE GRID */}
        <div className="row g-5"> {/* Large gap for white space */}
          {temples.length === 0 ? (
            <div className="col-12 text-center py-5">
              <p className="text-muted fs-5">No temples available right now. Check back soon!</p>
            </div>
          ) : (
            temples.map((temple, index) => (
              <div className="col-md-6 col-lg-4" key={temple._id} data-aos="fade-up" data-aos-delay={index * 100}>
                <div className="card h-100 border-0 shadow-sm temple-card overflow-hidden">
                  
                  {/* Image & Admin Action Overlay */}
                  <div className="position-relative overflow-hidden">
                    <img
                      src={temple.imageUrl || 'https://via.placeholder.com/400x300'}
                      className="card-img-top card-zoom"
                      alt={temple.name}
                      style={{ height: '260px', objectFit: 'cover' }}
                    />
                    
                    {/* Floating Location Badge */}
                    <div className="position-absolute bottom-0 start-0 m-3">
                      <span className="badge bg-white text-dark shadow-sm px-3 py-2 rounded-pill fw-bold">
                        <i className="bi bi-geo-alt-fill text-danger me-1"></i> {temple.location.split(',')[0]}
                      </span>
                    </div>

                    {/* ADMIN BUTTONS OVERLAY */}
                    {user?.role === 'ADMIN' && (
                      <div className="position-absolute top-0 end-0 m-3 d-flex flex-column gap-2">
                        <button 
                          className="btn btn-white btn-sm rounded-circle shadow admin-btn" 
                          onClick={() => navigate(`/admin/edit-temple/${temple._id}`)}
                          title="Edit"
                        >
                          <i className="bi bi-pencil-square text-primary">📝</i>
                        </button>
                        <button 
                          className="btn btn-white btn-sm rounded-circle shadow admin-btn" 
                          onClick={() => handleDelete(temple._id)}
                          title="Delete"
                        >
                          <i className="bi bi-trash3 text-danger">🗑️</i>
                        </button>
                      </div>
                    )}
                  </div>

                  <div className="card-body p-4 d-flex flex-column">
                    <h4 className="card-title fw-bold text-dark mb-2">{temple.name}</h4>
                    <p className="card-text text-muted small mb-4 line-clamp-2">
                      {temple.description}
                    </p>
                    
                    <div className="mt-auto">
                      <Link to={`/temple/${temple._id}`} className="btn btn-warning rounded-pill w-100 fw-bold shadow-sm py-2">
                        Book Darshan
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>

      <style>{`
        .temple-card {
          border-radius: 1.5rem;
          transition: all 0.4s ease;
          background: #fff;
        }
        .temple-card:hover {
          transform: translateY(-12px);
          box-shadow: 0 1.5rem 3rem rgba(0,0,0,0.12) !important;
        }
        .card-zoom {
          transition: transform 0.8s ease;
        }
        .temple-card:hover .card-zoom {
          transform: scale(1.1);
        }
        .line-clamp-2 {
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;  
          overflow: hidden;
        }
        .btn-white {
          background: white;
          width: 38px;
          height: 38px;
          display: flex;
          align-items: center;
          justify-content: center;
          border: none;
          transition: 0.3s;
        }
        .btn-white:hover {
          background: #f8f9fa;
          transform: scale(1.1);
        }
        .admin-btn {
          z-index: 10;
        }
      `}</style>
    </div>
  );
};

export default Home;