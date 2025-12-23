import React, { useState } from 'react';
import { Outlet, Link, useLocation } from 'react-router-dom';
import Sidebar from '../sidebar/Sidebar';
import './AdminLayout.css';

const AdminLayout = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  return (
    <div className={`admin-layout ${isSidebarOpen ? 'sidebar-open' : 'sidebar-closed'}`}>
      <Sidebar isOpen={isSidebarOpen} setIsOpen={setIsSidebarOpen} />
      
      {/* Backdrop for mobile */}
      {isSidebarOpen && (
        <div 
          className="admin-backdrop" 
          onClick={() => setIsSidebarOpen(false)}
        ></div>
      )}
      
      <main className="admin-main">
        <header className="admin-header">
          <div className="header-left">
            <button 
              className="sidebar-toggle" 
              onClick={() => setIsSidebarOpen(!isSidebarOpen)}
            >
              <i className={`fas ${isSidebarOpen ? 'fa-align-left' : 'fa-align-justify'}`}></i>
            </button>
            <div className="admin-search">
              <i className="fas fa-search"></i>
              <input type="text" placeholder="Search for cars, bookings..." />
            </div>
          </div>
          <div className="header-right">
            <div className="admin-notifications">
              <button className="notif-btn">
                <i className="fas fa-bell"></i>
                <span className="notif-dot"></span>
              </button>
            </div>
            <div className="admin-profile">
              <div className="profile-info">
                <span className="admin-name">Owner Account</span>
                <span className="admin-role">Super Admin</span>
              </div>
              <div className="admin-avatar">A</div>
            </div>
          </div>
        </header>
        
        <div className="admin-content">
          <Outlet />
        </div>
      </main>
    </div>
  );
};

export default AdminLayout;
