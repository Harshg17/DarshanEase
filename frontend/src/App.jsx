import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { ToastContainer } from 'react-toastify';
import { useEffect } from 'react';
import AOS from 'aos';

// Styles
import 'react-toastify/dist/ReactToastify.css';
import 'aos/dist/aos.css'; 
import './index.css';

// Components
import Navbar from './components/Navbar';
import Footer from './components/Footer';

// Pages
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import TempleDetails from './pages/TempleDetails';
import MyBookings from './pages/MyBookings';
import AboutContact from './pages/AboutContact';

// Admin Pages
import AddTemple from './pages/admin/AddTemple';
import EditTemple from './pages/admin/EditTemple';
import AddSlot from './pages/admin/AddSlot';

// --- THE ONE FIX FOR ALL ---
// This sub-component controls the layout of the entire site
const MainLayout = ({ children }) => {
  const location = useLocation();
  const isHomePage = location.pathname === '/';

  return (
    <main className={`flex-grow-1 ${isHomePage ? "" : "pt-navbar pb-5"}`}>
      {isHomePage ? (
        /* Home page remains full-width for the Hero section */
        children
      ) : (
        /* Every other page is automatically centered and padded */
        <div className="container mt-4">
          {children}
        </div>
      )}
    </main>
  );
};

function App() {
  useEffect(() => {
    AOS.init({
      duration: 1000,
      once: true,
      easing: 'ease-in-out',
    });
  }, []);

  return (
    <AuthProvider>
      <Router>
        <div className="d-flex flex-column min-vh-100">
          <Navbar />
          <ToastContainer position="top-right" autoClose={3000} />
          
          <MainLayout>
            <Routes>
              {/* Public Routes */}
              <Route path="/" element={<Home />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="/temple/:id" element={<TempleDetails />} />
              <Route path="/about" element={<AboutContact />} />
              
              {/* User Routes */}
              <Route path="/my-bookings" element={<MyBookings />} /> 
              
              {/* Admin Routes */}
              <Route path="/admin/add-temple" element={<AddTemple />} />
              <Route path="/admin/edit-temple/:id" element={<EditTemple />} />
              <Route path="/admin/add-slot/:id" element={<AddSlot />} />
            </Routes>
          </MainLayout>

          <Footer />
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;