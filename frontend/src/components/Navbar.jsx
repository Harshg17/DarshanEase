import { useContext, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { toast } from 'react-toastify';
import myLogo from './om.png';

const Navbar = () => {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();
  
  // 1. ADDED STATE: This tracks if the mobile menu is open or closed
  const [isNavOpen, setIsNavOpen] = useState(false);

  // 2. TOGGLE FUNCTION: Opens/closes the menu
  const handleToggle = () => {
    setIsNavOpen(!isNavOpen);
  };

  // 3. CLOSE FUNCTION: Closes menu when a link is clicked
  const closeNav = () => {
    setIsNavOpen(false);
  };

  const handleLogout = () => {
    logout();
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    closeNav(); // Close menu on logout
    toast.success("Logged out successfully!");
    navigate('/login');
    window.location.reload();
  };

  return (
    <nav className="navbar navbar-expand-lg sticky-top shadow" style={saffronNavStyle}>
      <div className="container">
        
        {}
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
        
        {}
        <button 
          className="navbar-toggler border-0 shadow-none text-white" 
          type="button" 
          onClick={handleToggle} // <-- Controlled by React now!
          aria-expanded={isNavOpen}
          aria-label="Toggle navigation"
        >
          {}
          <i className={`bi ${isNavOpen ? 'bi-x-lg' : 'bi-list'}`} style={{ fontSize: '2rem' }}></i>
        </button>

        {}
        {}
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
                  <Link className="nav-link text-white fw-bold" to="/login" onClick={closeNav}>Login</Link>
                </li>
                <li className="nav-item ms-lg-2">
                  <Link className="btn btn-dark text-white rounded-pill px-4 fw-bold shadow-sm" to="/register" onClick={closeNav}>
                    Register
                  </Link>
                </li>
              </>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
};

// Saffron Background Style
const saffronNavStyle = {
  backgroundColor: '#FF9933', 
  zIndex: 1050
};

export default Navbar;
