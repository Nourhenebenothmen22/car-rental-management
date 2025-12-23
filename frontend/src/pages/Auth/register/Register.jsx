import React from 'react';
import '../login/Login.css'; // Consistent styling
import './Register.css';
import { assets } from '../../../assets/assets';
import { Link } from 'react-router-dom';

function Register() {
  return (
    <div className="auth-wrapper">
      <div className="auth-overlay"></div>
      
      <div className="auth-card-refined">
        <div className="auth-top">
          <Link to="/" className="auth-logo-refined">
            <img src={assets.logo} alt="CarRental" />
          </Link>
          <h2>Create Account</h2>
          <p>Join the circle of premium car enthusiasts</p>
        </div>

        <form className="auth-form-refined" onSubmit={(e) => e.preventDefault()}>
          <div className="input-field">
            <input type="text" placeholder="Full Name" required />
          </div>

          <div className="input-field">
            <input type="email" placeholder="Email Address" required />
          </div>

          <div className="input-field">
            <input type="password" placeholder="Password" required />
          </div>

          <button type="submit" className="auth-main-btn">Get Started</button>
        </form>

        <div className="auth-or-line">
          <span>OR</span>
        </div>

        <div className="auth-social">
          <button className="google-btn">
            <img src={assets.gmail_logo} alt="G" />
            Sign up with Google
          </button>
        </div>

        <p className="auth-switch">
          Already have an account? <Link to="/login">Sign in</Link>
        </p>
      </div>
    </div>
  );
}

export default Register;