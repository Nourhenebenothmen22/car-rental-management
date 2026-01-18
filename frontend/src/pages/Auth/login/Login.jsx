import React, { useState } from 'react';
import './Login.css';
import { assets } from '../../../assets/assets';
import { Link, useNavigate } from 'react-router-dom';
import { useAuthStore } from '../../../store/auth.store';

function Login() {
  const [data, setData] = useState({
    email: '',
    password: ''
  });
  const [error, setError] = useState("");
  // Using local loading state for UI feedback during the async action
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();
  const { loginAction } = useAuthStore();
  
  const handleChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const user = await loginAction(data);
      
      // Redirection based on role
      if (user.role === 'owner') {
        navigate('/owner');
      } else {
        navigate('/');
      }
    } catch (err) {

      setError(err.response?.data?.detail || "Invalid email or password");
    } finally {
      setLoading(false);
    }
  };

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

        {error && <div className="auth-error-msg" style={{ color: 'red', marginBottom: '10px', textAlign: 'center' }}>{error}</div>}

        <form className="auth-form-refined" onSubmit={handleSubmit}>
          <div className="input-field">
            <input 
              type="email" 
              placeholder="Email Address" 
              name='email' 
              value={data.email}
              onChange={handleChange}
              required 
            />
          </div>

          <div className="input-field">
            <input 
              type="password" 
              placeholder="Password" 
              name='password' 
              value={data.password}
              onChange={handleChange}
              required 
            />
          </div>

          <div className="auth-meta">
            <label className="custom-check">
              <input type="checkbox" />
              <span className="box"></span>
              Remember me
            </label>
            <Link to="/forgot">Forgot Password?</Link>
          </div>

          <button type="submit" className="auth-main-btn" disabled={loading}>
            {loading ? "Signing In..." : "Sign In"}
          </button>
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
