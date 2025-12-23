import React, { useEffect } from 'react';
import './Cars.css';
import CarList from '../../components/CarList/CarList';

function Cars() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="cars-page">
      <div className="cars-hero">
        <div className="container">
          <div className="hero-content-vivid">
            <span className="badge-vivid">Premium Fleet</span>
            <h1>Discover Your <br /><span>Perfect Ride</span></h1>
            <p>From luxury sedans to high-performance SUVs, find the ideal car for your next adventure.</p>
          </div>
        </div>
        <div className="hero-shape"></div>
      </div>
      
      <div className="container">
        <div className="filter-bar">
          <div className="filter-group">
            <label>Search</label>
            <input type="text" placeholder="Search by brand or model..." />
          </div>
          <div className="filter-group">
            <label>Category</label>
            <select>
              <option>All Categories</option>
              <option>Sedan</option>
              <option>SUV</option>
              <option>Luxury</option>
              <option>Electric</option>
            </select>
          </div>
          <div className="filter-group">
            <label>Price Range</label>
            <select>
              <option>All Prices</option>
              <option>$0 - $50/day</option>
              <option>$50 - $100/day</option>
              <option>$100+/day</option>
            </select>
          </div>
          <button className="filter-btn">Apply Filters</button>
        </div>

        <div className="cars-grid-container">
          <CarList />
        </div>
      </div>
    </div>
  );
}

export default Cars;
