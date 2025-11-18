import React from 'react';
import './topbar.css';
import { FaSignOutAlt, FaBell, FaBars } from 'react-icons/fa';
import { Button } from 'react-bootstrap';

const Topbar = ({ toggleSidebar }) => {
  return (
    <div className="topbar">
      <div className="d-flex align-items-center">
        <button className="toggle-btn me-3" onClick={toggleSidebar}>
          <FaBars />
        </button>
        <h5 className="mb-0">Admin Dashboard</h5>
      </div>
      <div className="topbar-icons">
        <span className="notification-icon">
        </span>
        <button className="logout-btn">
          <FaSignOutAlt /> Logout
        </button>
      </div>
    </div>
  );
};

export default Topbar;
