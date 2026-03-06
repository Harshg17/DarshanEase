import { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { toast } from 'react-toastify';

const Navbar = () => {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    toast.success("Logged out successfully!");
    navigate('/login');
    window.location.reload();
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-dark sticky-top" style={navStyles}>
      <div className="container bg-primary rounded-pill px-4 py-2 shadow-lg border border-light border-opacity-25">
        {/* Brand with a unique font weight/style */}
        <Link className="navbar-brand fw-bolder fs-4 text-uppercase tracking-wider" to="/">
          <span className="text-warning">Darshan</span>Ease
        </Link>
        
        {/* MOBILE TOGGLER BUTTON */}
        <button 
          className="navbar-toggler border-0 shadow-none" 
          type="button" 
          data-bs-toggle="collapse" 
          data-bs-target="#navbarNav"
          aria-controls="navbarNav" 
          aria-expanded="false" 
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        {/* COLLAPSIBLE CONTENT */}
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav ms-auto align-items-center gap-2">
            <li className="nav-item">
              <Link className="nav-link hover-link" to="/">Home</Link>
            </li>
            
            {user ? (
              <>
                <li className="nav-item">
                  <span className="badge bg-white text-primary rounded-pill px-3 py-2 fw-bold mx-lg-2">
                    Hi, {user.name}
                  </span>
                </li>
                <li className="nav-item">
                  <Link className="nav-link text-white opacity-75 hover-link" to="/my-bookings">My Bookings</Link>
                </li>
                
                {/* Admin quick link if you want it here */}
                {user.role === 'ADMIN' && (
                  <li className="nav-item">
                    <Link className="nav-link text-warning fw-bold" to="/admin/add-temple">Admin</Link>
                  </li>
                )}

                <li className="nav-item ms-lg-3">
                  <button className="btn btn-outline-light rounded-pill px-4 btn-sm fw-bold" onClick={handleLogout}>
                    Logout
                  </button>
                </li>
              </>
            ) : (
              <>
                <li className="nav-item">
                  <Link className="nav-link" to="/login">Login</Link>
                </li>
                <li className="nav-item ms-lg-2">
                  <Link className="btn btn-warning rounded-pill px-4 fw-bold text-primary shadow-sm" to="/register">
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

// Custom "Unique" Styling
const navStyles = {
  background: 'rgba(253, 69, 13, 0.1)',
  backdropFilter: 'blur(10px)',
  marginTop: '15px',
  zIndex: 1050
};

export default Navbar;