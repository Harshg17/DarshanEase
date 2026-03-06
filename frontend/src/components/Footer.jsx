import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="bg-dark text-light pt-5 pb-3 mt-auto shadow-lg">
      <div className="container">
        <div className="row text-center text-md-start g-4">
          
          {/* Brand Section */}
          <div className="col-md-4 col-lg-5">
            <h5 className="text-warning fw-bold text-uppercase mb-3">
              <i className="bi bi-moon-stars-fill me-2"></i>DarshanEase
            </h5>
            <p className="text-secondary pe-md-4">
              Making your spiritual journey seamless. Book darshan slots at India's most revered temples with just a few clicks. 
            </p>
          </div>

          {/* Quick Links */}
          <div className="col-md-4 col-lg-3">
            <h5 className="text-white fw-bold mb-3">Quick Links</h5>
            <ul className="list-unstyled">
              <li className="mb-2">
                <Link to="/" className="text-secondary text-decoration-none footer-link">Home</Link>
              </li>
              <li className="mb-2">
                <Link to="/login" className="text-secondary text-decoration-none footer-link">Login</Link>
              </li>
              <li className="mb-2">
                <Link to="/register" className="text-secondary text-decoration-none footer-link">Register</Link>
              </li>
            </ul>
          </div>

          {/* Contact & Socials */}
          <div className="col-md-4 col-lg-4">
            <h5 className="text-white fw-bold mb-3">Connect With Us</h5>
            <p className="text-secondary mb-1">
              <i className="bi bi-envelope-fill me-2"></i> support@darshanease.com
            </p>
            <p className="text-secondary mb-3">
              <i className="bi bi-telephone-fill me-2"></i> +91 98765 43210
            </p>
            
            {/* Social Icons */}
            <div className="d-flex justify-content-center justify-content-md-start gap-3 mt-3">
              <a href="#" className="text-secondary fs-4 footer-icon"><i className="bi bi-facebook"></i></a>
              <a href="#" className="text-secondary fs-4 footer-icon"><i className="bi bi-instagram"></i></a>
              <a href="#" className="text-secondary fs-4 footer-icon"><i className="bi bi-twitter-x"></i></a>
            </div>
          </div>
        </div>

        <hr className="border-secondary my-4" />

        {/* Copyright */}
        <div className="text-center text-secondary small">
          © {new Date().getFullYear()} DarshanEase. All rights reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;