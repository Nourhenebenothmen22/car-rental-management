import React from 'react';
import './Login.css';
import { assets } from '../../../assets/assets';
import { Link } from 'react-router-dom';

function Login() {
  return (
    <div className="auth-wrapper">
      <div className="auth-overlay"></div>
      
      <div className="auth-card-refined">
        <div className="auth-top">
          <Link to="/" className="auth-logo-refined">
            <img src={assets.logo} alt="CarRental" />
          </Link>
          <h2>Welcome Back</h2>
          <p>Sign in to continue your journey</p>
        </div>

        <form className="auth-form-refined" onSubmit={(e) => e.preventDefault()}>
          <div className="input-field">
            <input type="email" placeholder="Email Address" required />
          </div>

          <div className="input-field">
            <input type="password" placeholder="Password" required />
          </div>

          <div className="auth-meta">
            <label className="custom-check">
              <input type="checkbox" />
              <span className="box"></span>
              Remember me
            </label>
            <Link to="/forgot">Forgot Password?</Link>
          </div>

          <button type="submit" className="auth-main-btn">Sign In</button>
        </form>

        <div className="auth-or-line">
          <span>OR</span>
        </div>

        <div className="auth-social">
          <button className="google-btn">
            <img src={assets.gmail_logo} alt="G" />
            Continue with Google
          </button>
        </div>

        <p className="auth-switch">
          New here? <Link to="/register">Create an account</Link>
        </p>
      </div>
    </div>
  );
}

export default Login;