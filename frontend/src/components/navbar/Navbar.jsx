import React, { useState, useEffect } from "react";
import "./Navbar.css";
import { Link, useLocation } from "react-router-dom";
import { useAuthStore } from "../../store/auth.store";

function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const location = useLocation();
  
  const { isAuthenticated, user, logout } = useAuthStore();

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
          {user?.role !== 'owner' && (
            <li>
              <Link
                to="/my-bookings"
                className={location.pathname === "/my-bookings" ? "active" : ""}
                onClick={() => setMenuOpen(false)}
              >
                <i className="fas fa-calendar-alt"></i> My Bookings
              </Link>
            </li>
          )}
        </ul>

        <div className="navbar-actions-premium">
          {isAuthenticated ? (
            <div className="user-profile-nav">
              <div className="user-info-brief">
                <span className="user-name-nav">{user?.name}</span>
                <div className="user-avatar-nav">
                  <i className="fas fa-user"></i>
                </div>
              </div>
              <button onClick={logout} className="logout-nav-btn" title="Logout">
                <i className="fas fa-sign-out-alt"></i>
              </button>
            </div>
          ) : (
            <Link to="/login" className="premium-signin-btn">
              <span>Sign In</span>
              <div className="btn-icon">
                <i className="fas fa-user-circle"></i>
              </div>
            </Link>
          )}
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
