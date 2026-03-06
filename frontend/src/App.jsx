import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import TempleDetails from './pages/TempleDetails';
import MyBookings from './pages/MyBookings';
import AddTemple from './pages/admin/AddTemple';
import EditTemple from './pages/admin/EditTemple';
import AddSlot from './pages/admin/AddSlot';

function App() {
  return (
    <AuthProvider>
      <Router>
        <Navbar />
        <ToastContainer position="top-right" autoClose={3000} />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/admin/add-temple" element={<AddTemple />} />
          <Route path="/admin/edit-temple/:id" element={<EditTemple />} />
          <Route path="/admin/add-slot/:id" element={<AddSlot />} />
          
          <Route path="/temple/:id" element={<TempleDetails />} />
          <Route path="/my-bookings" element={<MyBookings />} /> 
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;