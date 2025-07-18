import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Navbar = ({ darkMode, setDarkMode }) => {
  const { token, setToken } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    setToken(null);
    navigate('/login');
  };

  if (!token) return null;

  return (
    <nav className="navbar is-primary" role="navigation" aria-label="main navigation">
      <div className="navbar-brand">
        <a className="navbar-item" href="/">
          <span className="icon-text">
            <span className="icon">
              <i className="fas fa-book"></i>
            </span>
            <span>NoteApp</span>
          </span>
        </a>
      </div>

      <div className="navbar-menu">
        <div className="navbar-end">
          <div className="navbar-item">
            <div className="buttons">
              <button 
                className={`button ${darkMode ? 'is-light' : 'is-dark'}`}
                onClick={() => setDarkMode(!darkMode)}
                aria-label="Toggle dark mode"
              >
                <span className="icon">
                  <i className={darkMode ? 'fas fa-sun' : 'fas fa-moon'}></i>
                </span>
                <span>{darkMode ? ' Light Mode' : ' Dark Mode'}</span>
              </button>
              <button 
                className="button is-light" 
                onClick={handleLogout}
              >
                <span className="icon">
                  <i className="fas fa-sign-out-alt"></i>
                </span>
                <span>Logout</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;