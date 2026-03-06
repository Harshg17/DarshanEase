import { useState, useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import { toast } from 'react-toastify';

const AuthModal = ({ show, handleClose }) => {
  const [isLogin, setIsLogin] = useState(true); // Toggle between Login and Register
  const [formData, setFormData] = useState({ name: '', email: '', password: '' });
  const { login, register } = useContext(AuthContext);

  if (!show) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (isLogin) {
        await login(formData.email, formData.password);
        toast.success("Welcome back!");
      } else {
        await register(formData.name, formData.email, formData.password);
        toast.success("Account created successfully!");
      }
      handleClose(); // Close popup on success
    } catch (err) {
      toast.error(err.response?.data?.message || "Authentication failed");
    }
  };

  return (
    <div className="modal fade show d-block" style={{ backgroundColor: 'rgba(0,0,0,0.5)' }} tabIndex="-1">
      <div className="modal-dialog modal-dialog-centered">
        <div className="modal-content border-0 shadow-lg rounded-4">
          <div className="modal-header border-0 pb-0">
            <button type="button" className="btn-close" onClick={handleClose}></button>
          </div>
          <div className="modal-body px-4 pt-0 pb-4">
            <div className="text-center mb-4">
              <h3 className="fw-bold text-primary">{isLogin ? 'Welcome Back' : 'Create Account'}</h3>
              <p className="text-muted small">{isLogin ? 'Log in to book your darshan' : 'Join DarshanEase today'}</p>
            </div>

            <form onSubmit={handleSubmit}>
              {!isLogin && (
                <div className="mb-3">
                  <label className="form-label small fw-bold">Full Name</label>
                  <input 
                    type="text" className="form-control rounded-pill px-3" 
                    placeholder="Enter name" required 
                    onChange={(e) => setFormData({...formData, name: e.target.value})}
                  />
                </div>
              )}
              <div className="mb-3">
                <label className="form-label small fw-bold">Email Address</label>
                <input 
                  type="email" className="form-control rounded-pill px-3" 
                  placeholder="name@example.com" required 
                  onChange={(e) => setFormData({...formData, email: e.target.value})}
                />
              </div>
              <div className="mb-4">
                <label className="form-label small fw-bold">Password</label>
                <input 
                  type="password" className="form-control rounded-pill px-3" 
                  placeholder="••••••••" required 
                  onChange={(e) => setFormData({...formData, password: e.target.value})}
                />
              </div>
              <button type="submit" className="btn btn-warning w-100 rounded-pill fw-bold py-2 shadow-sm">
                {isLogin ? 'Login' : 'Sign Up'}
              </button>
            </form>

            <div className="text-center mt-4">
              <span className="small text-muted">
                {isLogin ? "Don't have an account?" : "Already have an account?"} 
                <button 
                  className="btn btn-link btn-sm fw-bold text-decoration-none p-0 ms-1" 
                  onClick={() => setIsLogin(!isLogin)}
                >
                  {isLogin ? 'Register Now' : 'Login Here'}
                </button>
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthModal;