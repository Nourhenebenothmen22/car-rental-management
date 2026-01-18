import React, { useState } from 'react';
import '../login/Login.css'; // Consistent styling
import './Register.css';
import { assets } from '../../../assets/assets';
import { Link, useNavigate } from 'react-router-dom';
import { useAuthStore } from '../../../store/auth.store';

function Register() {
  const [data, setData] = useState({
    name: '',
    email: '',
    password: '',
    role: 'user' // Default role
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();
  const { registerAction } = useAuthStore();

  const handleChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      await registerAction(data);
      navigate('/login');
    } catch (err) {

      setError(err.response?.data?.detail || "Registration failed. Please try again.");
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
          <h2>Create Account</h2>
          <p>Join the circle of premium car enthusiasts</p>
        </div>

        {error && <div className="auth-error-msg" style={{ color: 'red', marginBottom: '10px', textAlign: 'center' }}>{error}</div>}

        <form className="auth-form-refined" onSubmit={handleSubmit}>
          <div className="input-field">
            <input 
              type="text" 
              placeholder="Full Name" 
              name='name' 
              required 
              value={data.name} 
              onChange={handleChange}
            />
          </div>

          <div className="input-field">
            <input 
              type="email" 
              placeholder="Email Address" 
              name='email' 
              required 
              value={data.email} 
              onChange={handleChange}
            />
          </div>

          <div className="input-field">
            <input 
              type="password" 
              placeholder="Password" 
              name='password' 
              required 
              value={data.password} 
              onChange={handleChange}
            />
          </div>

          <div className="role-selection">
            <label className={`role-option ${data.role === 'user' ? 'active' : ''}`}>
              <input 
                type="radio" 
                name="role" 
                value="user" 
                checked={data.role === 'user'} 
                onChange={handleChange}
              />
              <span>Customer</span>
            </label>
            <label className={`role-option ${data.role === 'owner' ? 'active' : ''}`}>
              <input 
                type="radio" 
                name="role" 
                value="owner" 
                checked={data.role === 'owner'} 
                onChange={handleChange}
              />
              <span>Owner</span>
            </label>
          </div>

          <button type="submit" className="auth-main-btn" disabled={loading}>
            {loading ? "Creating Account..." : "Get Started"}
          </button>
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
