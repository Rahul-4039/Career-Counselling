import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/AdminDashboard.css';

const AdminDashboard = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    alert('👋 Admin logged out');
    navigate('/login');
  };

  const user = JSON.parse(localStorage.getItem('user'));

  if (!user || user.email !== 'arprs9076@gmail.com') {
    return (
      <div className="admin-container">
        <h2>❌ Unauthorized</h2>
        <p>You are not authorized to view this page.</p>
        <button onClick={() => navigate('/')}>Go to Home</button>
      </div>
    );
  }

  return (
    <div className="admin-dashboard">
      <header className="admin-header">
        <h1>👑 Admin Dashboard</h1>
        <button className="logout-btn" onClick={handleLogout}>Logout</button>
      </header>

      <main className="admin-content">
        <section className="admin-section">
          <h2>📊 Overview</h2>
          <ul>
            <li>Total Users: 120</li>
            <li>Premium Users: 38</li>
            <li>Recent Logins: 15 today</li>
          </ul>
        </section>

        <section className="admin-section">
          <h2>🛠 Admin Actions</h2>
          <button onClick={() => alert('📤 Sending newsletter...')}>Send Newsletter</button>
          <button onClick={() => alert('📥 Fetching Reports...')}>Download Reports</button>
        </section>
      </main>
    </div>
  );
};

export default AdminDashboard;
