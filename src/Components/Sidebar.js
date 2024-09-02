import React from 'react';
import { FaHome, FaTachometerAlt, FaShoppingCart, FaBoxOpen, FaSignOutAlt } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import { useUserContext } from '../context/authContext';

const Sidebar = () => {
    const sidebarStyle = {
        background: 'linear-gradient(135deg, #667eea, #764ba2)',
        color: '#fff',
        height: '100vh', // Ensures full viewport height
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        paddingLeft: '10px',
        paddingRight: '10px',
        position: 'fixed', // Keeps the sidebar fixed while scrolling
        top: 0,
        left: 0,
        width: '250px', // Fixed width for the sidebar
        overflowY: 'auto', // Handles overflow when content exceeds viewport height
    };

    const navLinkStyle = {
        color: '#adb5bd',
        fontWeight: '500',
        padding: '10px 15px',
        borderRadius: '4px',
        transition: 'background-color 0.3s ease',
        display: 'flex',
        alignItems: 'center',
        textDecoration: 'none',
    };

    const activeNavLinkStyle = {
        ...navLinkStyle,
        backgroundColor: '#007bff',
    };

    const navLinkHoverStyle = {
        backgroundColor: '#495057',
        color: '#fff',
    };

    const navItemStyle = {
        marginTop: '10px',
    };

    const iconStyle = {
        fontSize: '1.2rem',
        marginRight: '10px',
        verticalAlign: 'middle',
    };

    const logoutButtonStyle = {
        ...navLinkStyle,
        backgroundColor: '#dc3545',
        color: '#fff',
        marginBottom: '20px',
    };

    const navigate = useNavigate();
    const [state, setState] = useUserContext();

    const logoutController = async () => {
        setState(null);
        window.localStorage.removeItem("auth");
        navigate("/login");
    }

    return (
        <nav id="sidebar" className="sidebar" style={sidebarStyle}>
            <div>
                <ul className="nav flex-column">
                    <li className="nav-item" style={{ marginBottom: '20px' }}>
                        <a
                            className="nav-link active"
                            href="#"
                            style={activeNavLinkStyle}
                            onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = navLinkHoverStyle.backgroundColor)}
                            onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = activeNavLinkStyle.backgroundColor)}
                        >
                            <FaHome style={iconStyle} /> Home
                        </a>
                    </li>
                    <li className="nav-item" style={navItemStyle}>
                        <a
                            className="nav-link"
                            href="#"
                            style={navLinkStyle}
                            onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = navLinkHoverStyle.backgroundColor)}
                            onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = '')}
                        >
                            <FaTachometerAlt style={iconStyle} /> Dashboard
                        </a>
                    </li>
                    <li className="nav-item" style={navItemStyle}>
                        <a
                            className="nav-link"
                            href="#"
                            style={navLinkStyle}
                            onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = navLinkHoverStyle.backgroundColor)}
                            onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = '')}
                        >
                            <FaShoppingCart style={iconStyle} /> Orders
                        </a>
                    </li>
                    <li className="nav-item" style={navItemStyle}>
                        <a
                            className="nav-link"
                            href="#"
                            style={navLinkStyle}
                            onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = navLinkHoverStyle.backgroundColor)}
                            onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = '')}
                        >
                            <FaBoxOpen style={iconStyle} /> Products
                        </a>
                    </li>
                </ul>
            </div>
            <div>
                <button
                    className="nav-link"
                    style={logoutButtonStyle}
                    onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = '#c82333')}
                    onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = logoutButtonStyle.backgroundColor)}
                    onClick={logoutController}
                >
                    <FaSignOutAlt style={iconStyle} /> Logout
                </button>
            </div>
        </nav>
    );
};

export default Sidebar;
