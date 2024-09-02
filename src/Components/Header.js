import React from 'react';
import { useUserContext } from '../context/authContext';

const Header = () => {
  const navbarStyle = {
    background: 'linear-gradient(135deg, #667eea, #764ba2)',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
    padding: '10px 20px',
  };

  const brandStyle = {
    fontWeight: 'bold',
    color: '#fff',
    fontSize: '1.8rem',
    letterSpacing: '2px',
  };

  const navLinkStyle = {
    color: '#fff',
    margin: '0 15px',
    fontSize: '1rem',
    fontWeight: '500',
    transition: 'transform 0.3s ease, color 0.3s ease',
  };

  const navLinkHoverStyle = {
    transform: 'scale(1.1)',
    color: '#ffd700',
  };

  const disabledLinkStyle = {
    color: '#ddd',
    margin: '0 15px',
    cursor: 'not-allowed',
    fontSize: '1rem',
  };

  const [state, setState] = useUserContext();

  return (
    <nav className="navbar navbar-expand-lg" style={navbarStyle}>
      <div className="container-fluid">
        <a className="navbar-brand" href="/" style={brandStyle}>
          ASSIGNMENT
        </a>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarScroll"
          aria-controls="navbarScroll"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarScroll">
          <ul
            className="navbar-nav me-auto my-2 my-lg-0 navbar-nav-scroll"
            style={{ '--bs-scroll-height': '100px' }}
          >
            <li className="nav-item">
              <a
                className="nav-link active"
                aria-current="page"
                href="/"
                style={navLinkStyle}
                onMouseEnter={(e) => e.currentTarget.style.transform = navLinkHoverStyle.transform}
                onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}
              >
                Home
              </a>
            </li>

          </ul>
          {state?.user ? (
            <ul className="navbar-nav ml-auto">
              <li className="nav-item">
                <a
                  className="nav-link"
                  href="/profile"
                  style={navLinkStyle}
                  onMouseEnter={(e) => e.currentTarget.style.transform = navLinkHoverStyle.transform}
                  onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}
                >
                  {state.user.name}
                </a>
              </li>
            </ul>
          ) : (
            <ul className="navbar-nav ml-auto">
              <li className="nav-item">
                <a
                  className="nav-link"
                  href="/login"
                  style={navLinkStyle}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = navLinkHoverStyle.transform;
                    e.currentTarget.style.color = navLinkHoverStyle.color;
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = 'scale(1)';
                    e.currentTarget.style.color = '#fff';
                  }}
                >
                  Login
                </a>
              </li>
              <li className="nav-item">
                <a
                  className="nav-link"
                  href="/register"
                  style={navLinkStyle}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = navLinkHoverStyle.transform;
                    e.currentTarget.style.color = navLinkHoverStyle.color;
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = 'scale(1)';
                    e.currentTarget.style.color = '#fff';
                  }}
                >
                  Register
                </a>
              </li>
            </ul>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Header;
