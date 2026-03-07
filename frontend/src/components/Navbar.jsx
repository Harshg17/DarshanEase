import { useContext, useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { toast } from 'react-toastify';
import AuthModal from './AuthModal';
import myLogo from './om.png';

const Navbar = () => {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();
  const location = useLocation();
  
  const [isNavOpen, setIsNavOpen] = useState(false);
  const [showAuth, setShowAuth] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  // Detect scroll for the glass effect
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleLogout = () => {
    logout();
    setIsNavOpen(false);
    toast.success("Logged out successfully!");
    navigate('/');
  };

  // The logic: Should the navbar have a background?
  // YES if: we are NOT on the home page OR the user has scrolled down.
  const isHomePage = location.pathname === '/';
  const shouldBeOpaque = !isHomePage || isScrolled;

  return (
    <>
      <nav 
        className={`navbar navbar-expand-lg fixed-top transition-all ${
          shouldBeOpaque 
            ? 'glass-nav shadow-lg py-2' 
            : 'bg-transparent py-4 navbar-dark'
        }`}
      >
        <div className="container-fluid px-lg-5">
          {/* Brand Branding */}
          <Link className="navbar-brand d-flex align-items-center m-0 p-0" to="/" onClick={() => setIsNavOpen(false)}>
            <img src={myLogo} alt="Logo" width="40" height="40" className="me-2 rounded-circle bg-white p-1 shadow-sm" />
            <div className="d-flex flex-column lh-1">
              <span className="hindi-font fs-3 fw-bold text-white">दर्शन</span>
              <span className={`fs-6 fw-bold tracking-widest ${shouldBeOpaque ? 'text-dark' : 'text-white'}`} style={{ marginTop: '-2px', marginLeft: '6px' }}>EASE</span>
            </div>
          </Link>
          
          {/* Mobile Toggle Button */}
          <button 
            className={`navbar-toggler border-0 shadow-none ${shouldBeOpaque ? 'text-dark' : 'text-white'}`} 
            type="button" 
            onClick={() => setIsNavOpen(!isNavOpen)}
          >
            <i className={`bi ${isNavOpen ? 'bi-x-lg' : 'bi-list'}`} style={{ fontSize: '1.8rem' }}></i>
          </button>

          {/* Nav Links */}
          <div className={`collapse navbar-collapse ${isNavOpen ? 'show' : ''}`}>
            <ul className="navbar-nav ms-auto align-items-center gap-2 mt-3 mt-lg-0">
              
              <li className="nav-item">
                <Link className="nav-link nav-pill-btn" to="/" onClick={() => setIsNavOpen(false)}>Home</Link>
              </li>

              <li className="nav-item">
                <Link className="nav-link nav-pill-btn" to="/about" onClick={() => setIsNavOpen(false)}>About</Link>
              </li>
              
              {user ? (
                <>
                  <li className="nav-item">
                    <Link className="nav-link nav-pill-btn" to="/my-bookings" onClick={() => setIsNavOpen(false)}>My Bookings</Link>
                  </li>

                  <li className="nav-item">
                    <div className="nav-pill-btn user-badge">
                      🙏 {user.name.split(' ')[0]}
                    </div>
                  </li>

                  <li className="nav-item ms-lg-2">
                    <button className="btn btn-dark rounded-pill px-4 btn-sm fw-bold shadow-sm logout-hover" onClick={handleLogout}>
                      Logout
                    </button>
                  </li>
                </>
              ) : (
                <>
                  <li className="nav-item">
                    <button className="nav-link nav-pill-btn" onClick={() => { setShowAuth(true); setIsNavOpen(false); }}>Login</button>
                  </li>
                  <li className="nav-item ms-lg-2">
                    <button className="btn btn-dark rounded-pill px-4 fw-bold shadow-sm" onClick={() => { setShowAuth(true); setIsNavOpen(false); }}>Join</button>
                  </li>
                </>
              )}
            </ul>
          </div>
        </div>
      </nav>

      <AuthModal show={showAuth} handleClose={() => setShowAuth(false)} isLoginMode={true} />

      <style>{`
        .transition-all {
          transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1) !important;
        }

        /* Opaque State: Applied on non-home pages or on scroll */
        .glass-nav { 
          background: #FF9933 !important; /* Solid Brand Saffron */
        }

        /* Pill Buttons */
        .nav-pill-btn {
          color: white !important;
          font-weight: 600;
          padding: 8px 20px !important;
          border-radius: 50px;
          transition: 0.3s;
          display: flex;
          align-items: center;
        }

        .nav-pill-btn:hover {
          background: rgba(255, 255, 255, 0.2);
          transform: translateY(-2px);
        }

        .user-badge {
          background: rgba(255, 255, 255, 0.15);
          cursor: default;
        }

        .logout-hover:hover {
          background: #000 !important;
          transform: scale(1.05);
        }

        /* Mobile Responsive Background */
        @media (max-width: 991.98px) {
          .navbar-collapse {
            background: #FF9933;
            padding: 20px;
            border-radius: 20px;
            margin-top: 15px;
            box-shadow: 0 10px 30px rgba(0,0,0,0.1);
          }
          /* Darker background if toggled on the transparent home hero */
          .bg-transparent .navbar-collapse {
            background: rgba(0, 0, 0, 0.9);
            backdrop-filter: blur(10px);
          }
        }
      `}</style>
    </>
  );
};

export default Navbar;