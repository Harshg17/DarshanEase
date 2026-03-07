import React from 'react';

const AboutContact = () => {
  return (
    <div className="pb-5">
      {/* 1. ABOUT SECTION */}
      <div className="container pt-navbar" data-aos="fade-up">
        <div className="row justify-content-center">
          <div className="col-lg-10">
            <div className="glass-card p-5 rounded-5 shadow-lg border-0 text-center position-relative overflow-hidden">
              {/* Background layer - lowered z-index */}
              <div className="position-absolute top-0 start-0 w-100 h-100 bg-saffron-gradient opacity-10" style={{ zIndex: 0 }}></div>
              
              {/* Content layer - raised z-index */}
              <div className="position-relative" style={{ zIndex: 1 }}>
                <h1 className="hindi-font display-4 mb-4 text-dark">
                   हमारी कहानी <span className="fs-4 text-muted fw-light">(Our Story)</span>
                </h1>
                <p className="lead fs-5 text-secondary mb-4" style={{ lineHeight: '1.8' }}>
                  <span className="fw-bold text-dark">DarshanEase</span> was born out of a simple vision: to bridge the gap between devotees and the divine. In a world moving at light speed, finding a moment of peace at your favorite temple shouldn't be a struggle.
                </p>
                
                <div className="row g-4 mt-2">
                  <div className="col-md-4" data-aos="zoom-in" data-aos-delay="100">
                    <div className="p-3 bg-white rounded-4 shadow-sm">
                      <i className="bi bi-heart-fill text-danger fs-1 mb-2"></i>
                      <h5 className="fw-bold">Devotion First</h5>
                    </div>
                  </div>
                  <div className="col-md-4" data-aos="zoom-in" data-aos-delay="200">
                    <div className="p-3 bg-white rounded-4 shadow-sm">
                      <i className="bi bi-shield-check text-success fs-1 mb-2"></i>
                      <h5 className="fw-bold">Secure Booking</h5>
                    </div>
                  </div>
                  <div className="col-md-4" data-aos="zoom-in" data-aos-delay="300">
                    <div className="p-3 bg-white rounded-4 shadow-sm">
                      <i className="bi bi-people-fill text-primary fs-1 mb-2"></i>
                      <h5 className="fw-bold">Community Led</h5>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 2. CONTACT SECTION */}
      <div className="container mt-5 pt-5">
        <div className="row g-5 align-items-center">
          <div className="col-md-5" data-aos="fade-right">
            <h2 className="fw-bold mb-4">Get in Touch</h2>
            <p className="text-muted mb-5">Have questions? Our team is here to help you 24/7.</p>
            
            <div className="d-flex align-items-center mb-4 contact-item p-3 rounded-4 transition">
              <div className="icon-box bg-warning text-white rounded-circle me-3 shadow">
                <i className="bi bi-telephone-fill"></i>
              </div>
              <div>
                <h6 className="mb-0 text-muted">Call Us</h6>
                <span className="fw-bold">+91 98765 43210</span>
              </div>
            </div>

            <div className="d-flex align-items-center mb-4 contact-item p-3 rounded-4 transition">
              <div className="icon-box bg-dark text-white rounded-circle me-3 shadow">
                <i className="bi bi-envelope-heart"></i>
              </div>
              <div>
                <h6 className="mb-0 text-muted">Email Support</h6>
                <span className="fw-bold">support@darshanease.com</span>
              </div>
            </div>
          </div>

          <div className="col-md-7" data-aos="fade-left">
            <div className="bg-white p-5 rounded-5 shadow-lg border">
              <form>
                <div className="row g-3">
                  <div className="col-md-6">
                    <label className="form-label small fw-bold">Full Name</label>
                    <input type="text" className="form-control rounded-pill px-3 py-2 bg-light border-0" placeholder="Your Name" />
                  </div>
                  <div className="col-md-6">
                    <label className="form-label small fw-bold">Email Address</label>
                    <input type="email" className="form-control rounded-pill px-3 py-2 bg-light border-0" placeholder="email@example.com" />
                  </div>
                  <div className="col-12 mt-4">
                    <button type="button" className="btn btn-warning w-100 rounded-pill py-3 fw-bold shadow">
                      Send Message <i className="bi bi-send-fill ms-2"></i>
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Tiro+Devanagari+Hindi&display=swap');

        .hindi-font {
          font-family: 'Tiro Devanagari Hindi', serif !important;
          color: #212529 !important;
          opacity: 1 !important;
          display: block !important;
        }

        .glass-card {
          background: rgba(255, 255, 255, 0.85) !important;
          backdrop-filter: blur(15px);
          border: 1px solid rgba(255, 255, 255, 0.4);
        }

        .bg-saffron-gradient {
          background: linear-gradient(135deg, #FF9933 0%, #ffffff 100%);
        }

        .icon-box {
          width: 50px;
          height: 50px;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .contact-item {
          transition: all 0.3s ease;
        }

        .contact-item:hover {
          background: #fff;
          transform: translateX(10px);
          box-shadow: 0 10px 20px rgba(0,0,0,0.05);
        }
      `}</style>
    </div>
  );
};

export default AboutContact;