import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import Navigation from './components/Navbar';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import AdminDashboard from './pages/AdminDashboard';
import AdminBloodStock from './pages/AdminBloodStock';
import PatientDashboard from './pages/PatientDashboard';
import DonorDashboard from './pages/DonorDashboard';
import Feedback from './pages/Feedback';
import AdminUsers from './pages/AdminUsers';
import { useContext } from 'react';
import { AuthContext } from './context/AuthContext';

const ProtectedRoute = ({ children, role }) => {
  const { user, loading } = useContext(AuthContext);

  if (loading) return <div>Loading...</div>;

  if (!user) return <Navigate to="/login" />;

  if (role && user.role !== role && user.role !== 'admin') {
    return <Navigate to="/" />;
  }

  return children;
};

import Footer from './components/Footer';

function App() {
  return (
    <Router>
      <div className="d-flex flex-column min-vh-100">
        <Navigation />
        <main className="flex-grow-1">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/feedback" element={<Feedback />} />

            <Route path="/admin/dashboard" element={
              <ProtectedRoute role="admin">
                <AdminDashboard />
              </ProtectedRoute>
            } />

            <Route path="/admin/blood-stock" element={
              <ProtectedRoute role="admin">
                <AdminBloodStock />
              </ProtectedRoute>
            } />

            <Route path="/admin/users" element={
              <ProtectedRoute role="admin">
                <AdminUsers />
              </ProtectedRoute>
            } />

            <Route path="/patient/dashboard" element={
              <ProtectedRoute role="patient">
                <PatientDashboard />
              </ProtectedRoute>
            } />

            <Route path="/donor/dashboard" element={
              <ProtectedRoute role="donor">
                <DonorDashboard />
              </ProtectedRoute>
            } />
          </Routes>
        </main>
        <Footer />
      </div>
      <ToastContainer position="top-right" autoClose={3000} />
    </Router>
  );
}

export default App;
