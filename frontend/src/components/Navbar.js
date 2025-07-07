import React, { useState, useRef, useEffect } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { FaBars, FaTimes, FaUserCircle } from 'react-icons/fa';
import '../styles/Navbar.css';

const Navbar = () => {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem('user'));
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [mobileProfileOpen, setMobileProfileOpen] = useState(false);
  const profileRef = useRef();

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    alert('👋 You have been logged out.');
    navigate('/login');
    setDropdownOpen(false);
    setMobileMenuOpen(false);
  };

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (profileRef.current && !profileRef.current.contains(e.target)) {
        setDropdownOpen(false);
        setMobileProfileOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <nav className="navbar">
      <div className="navbar-logo">
        <NavLink to="/">CareerGenAi</NavLink>
      </div>

      {/* Desktop Links */}
      <ul className="navbar-links desktop">
        <li><NavLink to="/" end>Home</NavLink></li>
        {user && <li><NavLink to="/chat" className={({ isActive }) => isActive ? 'active' : ''}>AI Chat</NavLink></li>}
        {user && <li><NavLink to="/interest-form">Interest Form</NavLink></li>}
        {user && <li><NavLink to="/CareerQuiz">Quiz</NavLink></li>}
        {user && <li><NavLink to="/careerDetail">Careers</NavLink></li>}
        {user && <li><NavLink to="/consult">Consultants</NavLink></li>}
        {user && <li><NavLink to="/college">Top College</NavLink></li>}
        {user && <li><NavLink to="/services">Services</NavLink></li>}
      </ul>

      {/* Desktop Profile */}
      <div className="navbar-auth desktop" ref={profileRef}>
        {!user ? (
          <>
            <NavLink to="/login" className="auth-button">Login</NavLink>
            <NavLink to="/register" className="auth-button register">Register</NavLink>
          </>
        ) : (
          <>
            <FaUserCircle
              className="profile-icon"
              size={28}
              onClick={() => setDropdownOpen(!dropdownOpen)}
            />
            {dropdownOpen && (
              <div className="dropdown-menu">
                <button onClick={() => navigate('/profile')}>👤 See Profile</button>
                <button onClick={handleLogout}>🚪 Logout</button>
              </div>
            )}
          </>
        )}
      </div>

      {/* Mobile Hamburger */}
      <div className="hamburger" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
        {mobileMenuOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="mobile-menu">
          <ul>
            <li><NavLink to="/" onClick={() => setMobileMenuOpen(false)}>Home</NavLink></li>
            {user && <li><NavLink to="/chat" onClick={() => setMobileMenuOpen(false)}>AI Chat</NavLink></li>}
            {user && <li><NavLink to="/interest-form" onClick={() => setMobileMenuOpen(false)}>Interest Form</NavLink></li>}
            {user && <li><NavLink to="/CareerQuiz" onClick={() => setMobileMenuOpen(false)}>Quiz</NavLink></li>}
            {user && <li><NavLink to="/careerDetail" onClick={() => setMobileMenuOpen(false)}>Careers</NavLink></li>}
            {user && <li><NavLink to="/consult" onClick={() => setMobileMenuOpen(false)}>Consultants</NavLink></li>}
            {user && <li><NavLink to="/college" onClick={() => setMobileMenuOpen(false)}>Top College</NavLink></li>}
            {user && <li><NavLink to="/services" onClick={() => setMobileMenuOpen(false)}>Services</NavLink></li>}

            {user ? (
              <div className="mobile-profile" ref={profileRef}>
                <li onClick={() => setMobileProfileOpen(!mobileProfileOpen)}>Profile</li>
                {mobileProfileOpen && (
                  <div className="mobile-submenu">
                    <li
                      onClick={() => {
                        navigate('/profile');
                        setMobileMenuOpen(false);
                        setMobileProfileOpen(false);
                      }}
                    >
                      👤 See Profile
                    </li>
                    <li
                      onClick={() => {
                        handleLogout();
                        setMobileProfileOpen(false);
                      }}
                    >
                      🚪 Logout
                    </li>
                  </div>
                )}
              </div>
            ) : (
              <div className="mobile-profile">
                <NavLink
                  to="/login"
                  className="auth-button"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Login
                </NavLink>
                <NavLink
                  to="/register"
                  className="auth-button register"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Register
                </NavLink>
              </div>
            )}

          </ul>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
