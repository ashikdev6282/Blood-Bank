import React, { useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { FaChartPie, FaTint, FaEnvelope, FaUsers, FaSignOutAlt, FaCog, FaFileMedical } from 'react-icons/fa';
import './sidebar.css';

const Sidebar = ({ sidebarOpen, setSidebarOpen }) => {
  const location = useLocation();

  const navLinks = [
    { label: 'Overview', path: '/admin/overview', icon: <FaChartPie /> },
    { label: 'Blood Stock', path: '/admin/blood-stock', icon: <FaTint /> },
    { label: 'Requests', path: '/admin/requests', icon: <FaFileMedical /> },
    { label: 'Donors', path: '/admin/donors', icon: <FaUsers /> },
    { label: 'Drives', path: '/admin/drives', icon: <FaCog /> },
    { label: 'Statistics', path: '/admin/statistics', icon: <FaChartPie /> },
    { label: 'Messages', path: '/admin/messages', icon: <FaEnvelope /> },
  ];

  // Close sidebar on outside click (mobile only)
  useEffect(() => {
    const handleOutsideClick = (e) => {
      if (
        sidebarOpen &&
        !e.target.closest(".sidebar") &&
        !e.target.closest(".sidebar-toggle")
      ) {
        setSidebarOpen(false);
      }
    };

    document.addEventListener("mousedown", handleOutsideClick);
    return () => document.removeEventListener("mousedown", handleOutsideClick);
  }, [sidebarOpen, setSidebarOpen]);

  return (
    <>
      <div className={`sidebar ${sidebarOpen ? 'show' : ''}`}>
        <h3 className="sidebar-title">Admin Panel</h3>
        <ul className="sidebar-menu">
          {navLinks.map((link, idx) => (
            <li key={idx}>
              <Link
                to={link.path}
                className={location.pathname === link.path ? 'active' : ''}
              >
                {link.icon}
                {link.label}
              </Link>
            </li>
          ))}
        </ul>
      </div>

      {/* Overlay */}
      {sidebarOpen && <div className="sidebar-overlay"></div>}
    </>
  );
};

export default Sidebar;
