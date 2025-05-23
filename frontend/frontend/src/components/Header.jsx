
import React from 'react';
import { Link } from 'react-router-dom';

const Header = () => {
  const isAuthenticated = !!localStorage.getItem('token');

  const handleLogout = () => {
    localStorage.removeItem('token');
    window.location.href = '/';
  };

  return (
    <header className="navbar navbar-expand-lg navbar-dark bg-primary px-4 py-3">
      <div className="container-fluid">
        <h1 className="navbar-brand mb-0">
          📝 My Blog
        </h1>

        <nav className="d-flex align-items-center">
          <Link className="nav-link text-white" to="/">Home</Link>

          {isAuthenticated ? (
            <>
              <Link className="nav-link text-white" to="/dashboard">Dashboard</Link>
              <button
                onClick={handleLogout}
                className="btn btn-outline-light ms-3"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link className="nav-link text-white" to="/login">Login</Link>
              <Link className="nav-link text-white ms-3" to="/signup">Signup</Link>
            </>
          )}
        </nav>
      </div>
    </header>
  );
};

export default Header;
