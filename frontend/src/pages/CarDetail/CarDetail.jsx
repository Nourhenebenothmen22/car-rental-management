import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { dummyCarData } from '../../assets/assets';
import './CarDetail.css';

const CarDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [car, setCar] = useState(null);

  useEffect(() => {
    // Scroll to top on load
    window.scrollTo(0, 0);
    
    // Find car by ID from dummy data
    const foundCar = dummyCarData.find(c => c._id === id);
    if (foundCar) {
      setCar(foundCar);
    } else {
      // If not found, redirect to home or show 404
      console.warn("Car not found, showing first available for demo");
      setCar(dummyCarData[0]);
    }
  }, [id]);

  if (!car) return <div className="loading">Loading...</div>;

  return (
    <div className="car-detail-page">
      <div className="detail-hero">
        <div className="container">
          <button className="back-btn" onClick={() => navigate(-1)}>
            <i className="fas fa-arrow-left"></i> Back to Fleet
          </button>
          
          <div className="hero-flex">
            <div className="car-main-visual">
              <div className={`reveal active zoom-in`}>
                <img src={car.image} alt={car.brand} className="hero-img" />
                <div className="visual-reflection"></div>
              </div>
            </div>

            <div className="car-hero-info">
              <div className="reveal active fade-left">
                <span className="car-category-badge">{car.category}</span>
                <h1 className="car-name">{car.brand} {car.model}</h1>
                <div className="car-rating-strip">
                  <div className="stars">
                    <i className="fas fa-star"></i>
                    <i className="fas fa-star"></i>
                    <i className="fas fa-star"></i>
                    <i className="fas fa-star"></i>
                    <i className="fas fa-star-half-alt"></i>
                  </div>
                  <span>4.8 (120+ Reviews)</span>
                </div>
                
                <div className="price-box-large">
                  <span className="price-val">${car.pricePerDay}</span>
                  <span className="price-unit">/ Day</span>
                </div>

                <p className="car-tagline">
                  Experience the pinnacle of {car.category} performance and comfort.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="detail-content-section">
        <div className="container">
          <div className="detail-grid">
            <div className="main-info-side">
              {/* Specs Grid */}
              <div className="content-card reveal active fade-up">
                <h3>Technical Specifications</h3>
                <div className="specs-grid-premium">
                  <div className="spec-item-vivid">
                    <i className="fas fa-user-friends"></i>
                    <div className="spec-info">
                      <span>Capacity</span>
                      <p>{car.seating_capacity} Persons</p>
                    </div>
                  </div>
                  <div className="spec-item-vivid">
                    <i className="fas fa-gas-pump"></i>
                    <div className="spec-info">
                      <span>Fuel Type</span>
                      <p>{car.fuel_type}</p>
                    </div>
                  </div>
                  <div className="spec-item-vivid">
                    <i className="fas fa-cog"></i>
                    <div className="spec-info">
                      <span>Transmission</span>
                      <p>{car.transmission || 'Automatic'}</p>
                    </div>
                  </div>
                  <div className="spec-item-vivid">
                    <i className="fas fa-calendar-alt"></i>
                    <div className="spec-info">
                      <span>Model Year</span>
                      <p>{car.year}</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Description */}
              <div className="content-card reveal active fade-up" style={{ transitionDelay: '0.2s' }}>
                <h3>About this Vehicle</h3>
                <p className="description-text">
                  {car.description || "This luxury vehicle offers a perfect blend of performance, style, and comfort. Equipped with the latest technology and safety features, it ensures a premium driving experience for any occasion."}
                </p>
                
                <div className="features-checklist">
                  <h4>Highlighted Features</h4>
                  <div className="features-grid">
                    <span><i className="fas fa-check-circle"></i> GPS Navigation</span>
                    <span><i className="fas fa-check-circle"></i> Bluetooth Audio</span>
                    <span><i className="fas fa-check-circle"></i> Air Conditioning</span>
                    <span><i className="fas fa-check-circle"></i> Backup Camera</span>
                    <span><i className="fas fa-check-circle"></i> Sunroof</span>
                    <span><i className="fas fa-check-circle"></i> Leather Interior</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="booking-sidebar-side">
              <div className="booking-ultimate-console reveal active fade-left">
                <div className="console-floating-glow"></div>
                
                <div className="console-header-vivid">
                  <div className="header-text">
                    <h4>Instant Reservation</h4>
                    <p>Secure your keys in seconds</p>
                  </div>
                  <div className="vivid-price-tag">
                    <span className="amount">${car.pricePerDay}</span>
                    <span className="per">/Day</span>
                  </div>
                </div>

                <div className="booking-form-ultimate">
                  <div className="input-field-vivid">
                    <label><i className="fas fa-map-marker-alt"></i> Pick-up Location</label>
                    <select>
                      <option>Select City</option>
                      <option>New York</option>
                      <option>Miami</option>
                      <option>Los Angeles</option>
                      <option>London</option>
                    </select>
                  </div>

                  <div className="input-row-vivid">
                    <div className="input-field-vivid">
                      <label><i className="fas fa-calendar-day"></i> Pick-up</label>
                      <input type="date" />
                    </div>
                    <div className="input-field-vivid">
                      <label><i className="fas fa-calendar-check"></i> Return</label>
                      <input type="date" />
                    </div>
                  </div>

                  <div className="booking-summery-vivid">
                    <div className="summery-item">
                      <span>Rental Duration</span>
                      <span>1 Day</span>
                    </div>
                    <div className="summery-item total">
                      <span>Total Amount</span>
                      <span>${car.pricePerDay}</span>
                    </div>
                  </div>

                  <button className="btn-book-now-ultimate">
                    Reserve This Vehicle <i className="fas fa-chevron-right"></i>
                  </button>
                </div>

                <div className="console-footer-trust">
                  <div className="trust-badge">
                    <i className="fas fa-lock"></i>
                    <span>Secure Checkout</span>
                  </div>
                  <div className="trust-badge">
                    <i className="fas fa-shield-alt"></i>
                    <span>Full Insurance</span>
                  </div>
                  <div className="trust-badge">
                    <i className="fas fa-headset"></i>
                    <span>24/7 Support</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CarDetail;
