import { useContext, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { toast } from 'react-toastify';
import AuthModal from './AuthModal';
import myLogo from './om.png';

const Navbar = () => {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();
  
  // States for Mobile Menu and Auth Modal
  const [isNavOpen, setIsNavOpen] = useState(false);
  const [showAuth, setShowAuth] = useState(false);
  const [initialModalMode, setInitialModalMode] = useState(true); // true = login, false = signup

  const handleToggle = () => setIsNavOpen(!isNavOpen);
  const closeNav = () => setIsNavOpen(false);

  // Open modal in specific mode
  const openAuth = (isLogin) => {
    setInitialModalMode(isLogin);
    setShowAuth(true);
    closeNav(); 
  };

  const handleLogout = () => {
    logout();
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    closeNav();
    toast.success("Logged out successfully!");
    navigate('/'); // Navigate to home instead of /login to avoid 404s
  };

  return (
    <>
      <nav className="navbar navbar-expand-lg sticky-top shadow" style={saffronNavStyle}>
        <div className="container">
          
          {/* BRAND & LOGO */}
          <Link className="navbar-brand fw-bolder fs-4 text-uppercase tracking-wider d-flex align-items-center text-white" to="/" onClick={closeNav}>
            <img 
              src={myLogo} 
              alt="DarshanEase Logo" 
              width="40" 
              height="40" 
              className="me-2 bg-white rounded-circle p-1 shadow-sm" 
            />
            <span>Darshan<span className="text-dark">Ease</span></span>
          </Link>
          
          {/* MOBILE TOGGLER */}
          <button 
            className="navbar-toggler border-0 shadow-none text-white" 
            type="button" 
            onClick={handleToggle}
            aria-expanded={isNavOpen}
          >
            <i className={`bi ${isNavOpen ? 'bi-x-lg' : 'bi-list'}`} style={{ fontSize: '2rem' }}></i>
          </button>

          {/* MENU CONTENT */}
          <div className={`collapse navbar-collapse ${isNavOpen ? 'show' : ''}`} id="navbarNav">
            <ul className="navbar-nav ms-auto align-items-center gap-3 py-3 py-lg-0">
              <li className="nav-item">
                <Link className="nav-link text-white fw-bold" to="/" onClick={closeNav}>Home</Link>
              </li>
              
              {user ? (
                <>
                  <li className="nav-item">
                    <span className="badge bg-white text-dark rounded-pill px-3 py-2 fw-bold shadow-sm">
                      🙏 Namaste, {user.name.split(' ')[0]}
                    </span>
                  </li>
                  <li className="nav-item">
                    <Link className="nav-link text-white fw-bold" to="/my-bookings" onClick={closeNav}>My Bookings</Link>
                  </li>
                  
                  {user.role === 'ADMIN' && (
                    <li className="nav-item">
                      <Link className="nav-link text-dark bg-white rounded-pill px-3 py-1 fw-bold shadow-sm" to="/admin/add-temple" onClick={closeNav}>
                        Admin Panel
                      </Link>
                    </li>
                  )}

                  <li className="nav-item ms-lg-2">
                    <button className="btn btn-dark rounded-pill px-4 btn-sm fw-bold shadow-sm" onClick={handleLogout}>
                      Logout
                    </button>
                  </li>
                </>
              ) : (
                <>
                  <li className="nav-item">
                    {/* Trigger Modal Login */}
                    <button 
                      className="nav-link btn btn-link text-white fw-bold border-0" 
                      onClick={() => openAuth(true)}
                    >
                      Login
                    </button>
                  </li>
                  <li className="nav-item ms-lg-2">
                    {/* Trigger Modal Register */}
                    <button 
                      className="btn btn-dark text-white rounded-pill px-4 fw-bold shadow-sm" 
                      onClick={() => openAuth(false)}
                    >
                      Register
                    </button>
                  </li>
                </>
              )}
            </ul>
          </div>
        </div>
      </nav>

      {/* Auth Modal Component */}
      <AuthModal 
        show={showAuth} 
        handleClose={() => setShowAuth(false)} 
        isLoginMode={initialModalMode} 
      />
    </>
  );
};

const saffronNavStyle = {
  backgroundColor: '#FF9933', 
  zIndex: 1050
};

export default Navbar;