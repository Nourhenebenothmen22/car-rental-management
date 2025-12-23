import React, { useState, useEffect } from "react";
import "./Navbar.css";
import { assets } from "../../assets/assets";
import { Link, useLocation } from "react-router-dom";

function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  const isCarsPage = location.pathname === "/cars";
  const useLightText = isCarsPage && !isScrolled;

  return (
    <nav className={`navbar-premium ${isScrolled ? "scrolled" : ""} ${useLightText ? "light-text" : ""}`}>
      <div className="navbar-container">
        <Link to="/" className="navbar-logo-area">
          <span className="logo-text">Car<span>Rental</span></span>
        </Link>

        <ul className={`navbar-links-premium ${menuOpen ? "mobile-active" : ""}`}>
          <li>
            <Link to="/" className={location.pathname === "/" ? "active" : ""} onClick={() => setMenuOpen(false)}>
              <i className="fas fa-home"></i> Home
            </Link>
          </li>
          <li>
            <Link
              to="/cars"
              className={location.pathname === "/cars" ? "active" : ""}
              onClick={() => setMenuOpen(false)}
            >
              <i className="fas fa-car-side"></i> Explore Cars
            </Link>
          </li>
          <li>
            <Link
              to="/my-bookings"
              className={location.pathname === "/my-bookings" ? "active" : ""}
              onClick={() => setMenuOpen(false)}
            >
              <i className="fas fa-calendar-alt"></i> My Bookings
            </Link>
          </li>
        </ul>

        <div className="navbar-actions-premium">
          <Link to="/login" className="premium-signin-btn">
            <span>Sign In</span>
            <div className="btn-icon">
              <i className="fas fa-user-circle"></i>
            </div>
          </Link>
        </div>

        <button className={`hamburger-premium ${menuOpen ? "active" : ""}`} onClick={toggleMenu}>
          <span></span>
          <span></span>
          <span></span>
        </button>
      </div>
    </nav>
  );
}

export default Navbar;
