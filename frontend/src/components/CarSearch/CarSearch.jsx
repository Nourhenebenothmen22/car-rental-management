import React from 'react';
import './CarSearch.css';
import { assets } from '../../assets/assets';
import { useScrollReveal } from '../../hooks/useScrollReveal';

const CarSearch = () => {
  const [heroRef, heroVisible] = useScrollReveal({ threshold: 0.1 });
  const [searchRef, searchVisible] = useScrollReveal({ threshold: 0.1 });

  return (
    <section className="car-search-hero">
      <div className="hero-content" ref={heroRef}>
        <div className={`hero-text reveal ${heroVisible ? 'active fade-up' : ''}`}>
          <h1>Experience Luxury <br /><span>Drive Your Dream</span></h1>
          <p>Choose from our curated collection of premium vehicles for your next journey. Quality and comfort guaranteed.</p>
        </div>

        <div className={`hero-image-container reveal ${heroVisible ? 'active fade-right' : ''}`}>
          <img src={assets.main_car} alt="Luxury Car" className="hero-car-image" />
          <div className="hero-gradient-overlay"></div>
        </div>
      </div>

      <div className="search-container" ref={searchRef}>
        <div className={`reveal ${searchVisible ? 'active fade-up' : ''}`}>
          <div className="search-tabs">
            <button className="active">Same Drop-off</button>
            <button>Different Drop-off</button>
          </div>
          
          <div className="search-box">
            <div className="search-group">
              <label><img src={assets.location_icon} alt="" /> Pickup Location</label>
              <select>
                <option>Select your city</option>
                <option>New York</option>
                <option>Los Angeles</option>
                <option>Miami</option>
                <option>Chicago</option>
              </select>
            </div>

            <div className="divider"></div>

            <div className="search-group">
              <label><i className="fas fa-calendar-alt" style={{color: 'var(--primary-color)'}}></i> Pick-up Date</label>
              <input type="date" />
            </div>

            <div className="divider"></div>

            <div className="search-group">
              <label><i className="fas fa-calendar-check" style={{color: 'var(--primary-color)'}}></i> Return Date</label>
              <input type="date" />
            </div>

            <button className="hero-search-btn">
              Find Your Car
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CarSearch
