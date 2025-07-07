// src/App.js
import React, { useEffect, useState } from 'react';
import { fetchCareers } from './api';
import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import Chat from './pages/Chat';
import InterestForm from './pages/InterestForm';
import CareerDetail from './pages/CareerDetail';
import Consult from './pages/Consult';
import Login from './pages/Login';
import Register from './pages/Register';
import CareerQuiz from './pages/CareerQuiz';
import VerifyOtp from './pages/VerifyOtp';
import PremiumPlans from './components/PremiumPlans';
import CollegesByLocation from './pages/CollegesByLocation';
import Profile from './pages/Profile';
import PrivateRoute from './routes/PrivateRoute';
import Services from './pages/ServicesPage';
import CareerCompare from './pages/CareerCompare';
import ResumeBuilder from './pages/ResumeBuilder';
import QrPopup from './components/QrPopup';
import AdminDashboard from './pages/AdminDashboard';
import UploadReceipt from './components/UploadReceipt';

// ✅ Component to handle layout logic
const API = process.env.REACT_APP_API_URL;

const Layout = () => {
  const location = useLocation();
  const isHomePage = location.pathname === '/';

  return (
    <>
      <Navbar />
      <main className="app-content">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/chat" element={<PrivateRoute><Chat /></PrivateRoute>} />
          <Route path="/interest-form" element={<PrivateRoute><InterestForm /></PrivateRoute>} />
          <Route path="/careerQuiz" element={<PrivateRoute><CareerQuiz /></PrivateRoute>} />
          <Route path="/careerDetail" element={<PrivateRoute><CareerDetail /></PrivateRoute>} />
          <Route path="/consult" element={<PrivateRoute><Consult /></PrivateRoute>} />
          <Route path="/college" element={<PrivateRoute><CollegesByLocation /></PrivateRoute>} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/verify-otp" element={<VerifyOtp />} />
          <Route path="/pricing" element={<PremiumPlans />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="*" element={<Navigate to="/" />} />
          <Route path="/services" element={<PrivateRoute><Services /></PrivateRoute>} />
          <Route path="/compare" element={<PrivateRoute><CareerCompare /></PrivateRoute>}/>
          <Route path="/resume-builder" element={<ResumeBuilder/>}/>
          <Route path="/qr-popup" element={<QrPopup/>}/>
          <Route path="/admin-dashboard" element={<AdminDashboard />} />
          <Route path="/upload-receipt" element={<UploadReceipt />} />
          

        </Routes>
      </main>
      {isHomePage && <Footer />}
    </>
  );
};

const App = () => {
  return (
    <Router>
      <Layout />
    </Router>
  );
};

export default App;
