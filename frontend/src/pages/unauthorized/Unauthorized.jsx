import React from 'react';
import './Unauthorized.css';
import { Link } from 'react-router-dom';

function Unauthorized() {
  return (
    <div className="unauthorized-container">
      
      <div className="unauthorized-box">
        <div className="access-denied-icon">🔐</div>
        <h1>403</h1>
        <h2>Unauthorized</h2>
        <p>You do not have permission to access this page. Please contact the administrator or return to the homepage.</p>
        
        <div className="btn-container">
          <Link to="/" className="btn">
            <span>Go Home</span>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Unauthorized;