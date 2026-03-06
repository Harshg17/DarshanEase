import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// Components
import Navbar from './components/Navbar';
import Footer from './components/Footer';

// Pages
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import TempleDetails from './pages/TempleDetails';
import MyBookings from './pages/MyBookings';

// Admin Pages
import AddTemple from './pages/admin/AddTemple';
import EditTemple from './pages/admin/EditTemple';
import AddSlot from './pages/admin/AddSlot';


function App() {
  return (
    <AuthProvider>
      <Router>
        {/* 
          The d-flex, flex-column, and min-vh-100 classes force the 
          layout to take up at least 100% of the viewport height. 
        */}
        <div className="d-flex flex-column min-vh-100">
          <Navbar />
          <ToastContainer position="top-right" autoClose={3000} />
          
          {/* flex-grow-1 pushes the footer to the bottom */}
          <main className="flex-grow-1">
            <Routes>
              {/* Public Routes */}
              <Route path="/" element={<Home />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="/temple/:id" element={<TempleDetails />} />
              
              {/* Protected User Routes */}
              <Route path="/my-bookings" element={<MyBookings />} /> 
              
              {/* Admin Routes */}
              <Route path="/admin/add-temple" element={<AddTemple />} />
              <Route path="/admin/edit-temple/:id" element={<EditTemple />} />
              <Route path="/admin/add-slot/:id" element={<AddSlot />} />
              
            </Routes>
          </main>

          <Footer />
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;