import React from 'react';
import { NavLink, Link } from 'react-router-dom';
import { assets } from '../../assets/assets';
import './Sidebar.css';

const Sidebar = ({ isOpen, setIsOpen }) => {
  const menuItems = [
    { name: 'Dashboard', icon: 'fa-th-large', path: '/owner/dashboard' },
    { name: 'Manage Cars', icon: 'fa-car', path: '/owner/cars' },
    { name: 'Add New Car', icon: 'fa-plus-circle', path: '/owner/add-car' },
    { name: 'Bookings', icon: 'fa-calendar-check', path: '/owner/bookings' },
  ];
 
  return (
    <aside className={`admin-sidebar ${isOpen ? 'open' : 'closed'}`}>
      <div className="sidebar-brand">
        <Link to="/">
          <span className="brand-name">CarRental</span>
        </Link>
      </div>

      <nav className="sidebar-nav">
        {menuItems.map((item, index) => (
          <NavLink 
            key={index}
            to={item.path}
            className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}
          >
            <i className={`fas ${item.icon}`}></i>
            <span className="link-text">{item.name}</span>
          </NavLink>
        ))}
      </nav>

      <div className="sidebar-footer">
        <button className="logout-btn">
          <i className="fas fa-sign-out-alt"></i>
          <span className="link-text">Sign Out</span>
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;
