import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="footer-section mt-5">
      {/* Animated Waves */}
      <div className="waves">
        <div className="wave" id="wave1"></div>
        <div className="wave" id="wave2"></div>
        <div className="wave" id="wave3"></div>
        <div className="wave" id="wave4"></div>
      </div>

      <div className="container pt-5 pb-4">
        <div className="row g-4 text-white">
          
          {/* Brand Section */}
          <div className="col-lg-4 col-md-6" data-aos="fade-up">
            <h3 className="hindi-font mb-3 fw-bold fs-2">दर्शन <span className="fs-6 fw-light text-uppercase tracking-widest">Ease</span></h3>
            <p className="text-white-50 lh-lg">
              "मन चंगा तो कठौती में गंगा"<br />
              Simplifying your spiritual journey by making Darshan bookings accessible and hassle-free for everyone.
            </p>
            
          </div>

          {/* Quick Links */}
          <div className="col-lg-2 col-md-6 ms-auto" data-aos="fade-up" data-aos-delay="100">
            <h5 className="fw-bold mb-4">Quick Links</h5>
            <ul className="list-unstyled footer-links">
              <li><Link to="/">Home</Link></li>
              <li><Link to="/about">Our Story</Link></li>
              <li><Link to="/about">Contact Us</Link></li>
              <li><Link to="/contact">Support</Link></li>
            </ul>
          </div>

          {/* Contact Info */}
          <div className="col-lg-3 col-md-6" data-aos="fade-up" data-aos-delay="200">
            <h5 className="fw-bold mb-4">Contact Us</h5>
            <ul className="list-unstyled footer-contact text-white-50">
              <li className="mb-2"><i className="bi bi-geo-alt-fill me-2 text-warning"></i> Bhopal, Madhya Pradesh</li>
              <li className="mb-2"><i className="bi bi-envelope-fill me-2 text-warning"></i> support@darshanease.com</li>
              <li className="mb-2"><i className="bi bi-telephone-fill me-2 text-warning"></i> +91 98765 43210</li>
            </ul>
          </div>
        </div>

        <hr className="my-4 border-white opacity-10" />

        <div className="row align-items-center text-white-50 small">
          <div className="col-md-6 text-center text-md-start">
            &copy; 2026 DarshanEase. Built with devotion in India.
          </div>
          <div className="col-md-6 text-center text-md-end mt-2 mt-md-0">
            <a href="#" className="text-white-50 text-decoration-none me-3">Privacy Policy</a>
            <a href="#" className="text-white-50 text-decoration-none">Terms of Service</a>
          </div>
        </div>
      </div>

      <style>{`
        .footer-section {
            position: relative;
            background: #1a1a1a; /* Matches the 'fill' color in the SVG above */
            padding: 20px 0;
            margin-top: 150px;
          }

        .waves {
          position: absolute;
          top: -100px;
          left: 0;
          width: 100%;
          height: 100px;
          background: orange;
        }

        .wave {
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100px;
            /* We replaced the broken link with a hardcoded SVG wave */
            background: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 1200 120' preserveAspectRatio='none'%3E%3Cpath d='M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V0H0V27.35A600.21,600.21,0,0,0,321.39,56.44Z' fill='%231a1a1a'/%3E%3C/svg%3E");
            background-size: 1000px 100px;
          }

        .wave#wave1 { z-index: 1000; opacity: 1; bottom: 0; animation: animateWave 4s linear infinite; }
        .wave#wave2 { z-index: 999; opacity: 0.5; bottom: 10px; animation: animateWave_02 4s linear infinite; }
        .wave#wave3 { z-index: 1000; opacity: 0.2; bottom: 15px; animation: animateWave 3s linear infinite; }
        .wave#wave4 { z-index: 999; opacity: 0.7; bottom: 20px; animation: animateWave_02 3s linear infinite; }

        @keyframes animateWave {
          0% { background-position-x: 1000px; }
          100% { background-position-x: 0px; }
        }

        @keyframes animateWave_02 {
          0% { background-position-x: 0px; }
          100% { background-position-x: 1000px; }
        }

        /* Styling for content */
        .footer-section { background: #1a1a1a; } /* Dark theme footer */

        .social-icon {
          width: 40px;
          height: 40px;
          background: rgba(255, 255, 255, 0.1);
          display: flex;
          align-items: center;
          justify-content: center;
          border-radius: 50%;
          color: white;
          text-decoration: none;
          transition: 0.3s;
        }

        .social-icon:hover {
          background: #FF9933;
          transform: translateY(-5px);
          color: white;
        }

        .footer-links li a {
          color: rgba(255, 255, 255, 0.5);
          text-decoration: none;
          transition: 0.3s;
          display: block;
          margin-bottom: 10px;
        }

        .footer-links li a:hover {
          color: #FF9933;
          padding-left: 10px;
        }
      `}</style>
    </footer>
  );
};

export default Footer;