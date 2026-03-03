import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import api from '../utils/api';
import { toast } from 'react-toastify';

const Register = () => {
  const [formData, setFormData] = useState({ name: '', email: '', password: '' });
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await api.post('/auth/register', formData);
      toast.success('Registration successful! Please login.');
      navigate('/login');
    } catch (err) {
      toast.error(err.response?.data?.message || 'Registration failed');
    }
  };

  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-5 card p-4 shadow">
          <h2 className="text-center mb-4">Create Account</h2>
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label>Full Name</label>
              <input type="text" className="form-control" required 
                onChange={(e) => setFormData({...formData, name: e.target.value})} />
            </div>
            <div className="mb-3">
              <label>Email</label>
              <input type="email" className="form-control" required 
                onChange={(e) => setFormData({...formData, email: e.target.value})} />
            </div>
            <div className="mb-3">
              <label>Password</label>
              <input type="password" className="form-control" required 
                onChange={(e) => setFormData({...formData, password: e.target.value})} />
            </div>
            <button className="btn btn-primary w-100">Register</button>
          </form>
          <p className="mt-3 text-center">Already have an account? <Link to="/login">Login</Link></p>
        </div>
      </div>
    </div>
  );
};

export default Register;