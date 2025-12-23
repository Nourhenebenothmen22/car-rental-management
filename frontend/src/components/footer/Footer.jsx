import React from 'react'
import "./Footer.css";
import { assets } from "../../assets/assets";
import { Link } from "react-router-dom";

function Footer() {
  return (
    <footer className="footer-section">
      <div className="container">
        <div className="footer-grid">
          <div className="footer-brand">
            <Link to="/" className="footer-logo-link">
              <span className="logo-text">Car<span>Rental</span></span>
            </Link>
            <p>Providing the highest quality luxury car rentals since 2010. Your comfort and safety are our top priority.</p>
            <div className="social-links">
              <a href="#"><img src={assets.facebook_logo} alt="Facebook" /></a>
              <a href="#"><img src={assets.instagram_logo} alt="Instagram" /></a>
              <a href="#"><img src={assets.twitter_logo} alt="Twitter" /></a>
            </div>
          </div>

          <div className="footer-links">
            <h4>Quick Links</h4>
            <ul>
              <li><Link to="/">Home</Link></li>
              <li><Link to="/cars">Cars</Link></li>
              <li><Link to="/about">About Us</Link></li>
              <li><Link to="/contact">Contact</Link></li>
            </ul>
          </div>

          <div className="footer-links">
            <h4>Our Services</h4>
            <ul>
              <li><Link to="/rent">Car Rental</Link></li>
              <li><Link to="/sell">Sell Your Car</Link></li>
              <li><Link to="/insurance">Insurance</Link></li>
              <li><Link to="/support">24/7 Support</Link></li>
            </ul>
          </div>

          <div className="footer-contact">
            <h4>Contact Info</h4>
            <ul>
              <li>
                <img src={assets.location_icon} alt="" />
                <span>123 Luxury Ave, New York, NY 10001</span>
              </li>
              <li>
                <img src={assets.gmail_logo} alt="" />
                <span>contact@premiumcars.com</span>
              </li>
              <li>
                <img src={assets.fuel_icon} alt="" />
                <span>+1 (555) 123-4567</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="footer-bottom">
          <p>&copy; 2025 PremiumCars. All rights reserved.</p>
          <div className="footer-legal">
            <a href="#">Privacy Policy</a>
            <span className="dot"></span>
            <a href="#">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer