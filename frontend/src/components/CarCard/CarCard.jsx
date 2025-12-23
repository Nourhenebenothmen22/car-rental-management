import React from 'react';
import { Link } from 'react-router-dom';
import './CarCard.css';
import { assets } from '../../assets/assets';

function CarCard({ car }) {
  return (
    <div className="car-card-premium">
      <div className="car-card-visual">
        <div className="visual-glow"></div>
        <img src={car.image} alt={`${car.brand} ${car.model}`} className="car-image-main" />
        <div className="category-tag">{car.category}</div>
      </div>
      
      <div className="car-card-info">
        <div className="info-main">
          <div className="brand-model">
            <span className="brand">{car.brand}</span>
            <h3 className="model">{car.model}</h3>
          </div>
          <div className="rating-pill">
            <i className="fas fa-star"></i>
            <span>4.8</span>
          </div>
        </div>
        
        <div className="specs-row">
          <div className="spec-capsule">
            <i className="fas fa-user-friends"></i>
            <span>{car.seating_capacity} Seats</span>
          </div>
          <div className="spec-capsule">
            <i className="fas fa-gas-pump"></i>
            <span>{car.fuel_type}</span>
          </div>
          <div className="spec-capsule">
            <i className="fas fa-cog"></i>
            <span>Auto</span>
          </div>
        </div>
        
        <div className="card-action-footer">
          <div className="price-tag">
            <span className="currency">$</span>
            <span className="value">{car.pricePerDay}</span>
            <span className="duration">/day</span>
          </div>
          <Link to={`/car/${car._id}`} className="btn-rent-vivid">
            <span className="btn-text">Rent Now</span>
            <i className="fas fa-chevron-right"></i>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default CarCard;
