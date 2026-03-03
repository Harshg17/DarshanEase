import { useState, useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      await login(email, password);
      toast.success('Welcome back!');
      navigate('/'); // Go to home page after login
    } catch (err) {
      toast.error('Invalid Credentials');
    }
  };

  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-5 card p-4 shadow">
          <h2 className="text-center mb-4">Login to DarshanEase</h2>
          <form onSubmit={handleLogin}>
            <div className="mb-3">
              <label>Email</label>
              <input type="email" className="form-control" required 
                onChange={(e) => setEmail(e.target.value)} />
            </div>
            <div className="mb-3">
              <label>Password</label>
              <input type="password" className="form-control" required 
                onChange={(e) => setPassword(e.target.value)} />
            </div>
            <button className="btn btn-success w-100">Login</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;