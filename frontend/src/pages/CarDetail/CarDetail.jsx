import React, { useEffect, useState } from 'react';
import './CarDetail.css';
import { useParams, useNavigate } from 'react-router-dom';
import { useCarStore } from '../../store/car.store';
import { useBookingStore } from '../../store/booking.store';
import { useAuthStore } from '../../store/auth.store';
import { getImageUrl } from '../../services/api';


const CarDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user, isAuthenticated } = useAuthStore();
  
  // Car Store
  const { currentCar: car, loading: carLoading, fetchCarById } = useCarStore();
  
  // Booking Store
  const { addBooking, loading: bookingLoading, success: bookingSuccess, resetSuccess } = useBookingStore();
  
  // Local state for pricing calculation
  const [dates, setDates] = useState({
    pickup: '',
    return: ''
  });
  const [totalPrice, setTotalPrice] = useState(0);

  useEffect(() => {
    window.scrollTo(0, 0);
    resetSuccess(); // Reset previous success state
    fetchCarById(id);
  }, [id, fetchCarById, resetSuccess]);

  // Update total price when dates or car changes
  useEffect(() => {
    if (dates.pickup && dates.return && car) {
      const start = new Date(dates.pickup);
      const end = new Date(dates.return);
      const diffTime = Math.abs(end - start);
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)) || 1;
      const price = car.price_per_day || car.pricePerDay || 0;
      setTotalPrice(diffDays * price);
    } else if (car) {
       // Initialize price display if no dates selected yet
       setTotalPrice(car.price_per_day || car.pricePerDay || 0);
    }
  }, [dates, car]);

  const handleDateChange = (e) => {
    setDates({ ...dates, [e.target.name]: e.target.value });
  };

  const handleBooking = async () => {
    if (!isAuthenticated) {
      navigate('/login', { state: { from: `/car/${id}` } });
      return;
    }

    if (!dates.pickup || !dates.return) {
      alert("Please select pickup and return dates.");
      return;
    }

    try {
      const bookingData = {
        car_id: car.id,
        user_id: user.id,
        owner_id: car.owner_id,
        pickup_date: dates.pickup,
        return_date: dates.return,
        total_price: totalPrice,
        status: 'pending'
      };
      await addBooking(bookingData);
    } catch (error) {

      alert("Something went wrong with the reservation. Please try again.");
    }
  };


  if (carLoading) return (
    <div className="loading-container" style={{ height: '90vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', background: '#f8fafc' }}>
      <div className="premium-loader"></div>
      <p style={{ marginTop: '20px', fontWeight: '700', color: '#64748b', letterSpacing: '1px' }}>PREPARING LUXURY EXPERIENCE...</p>
    </div>
  );

  if (!car) return <div className="error-404" style={{ textAlign: 'center', padding: '100px' }}>Car not found.</div>;

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
                <div className="hero-car-badge">Top Choice</div>
                <img src={getImageUrl(car.image)} alt={car.brand} className="hero-img" />
                <div className="visual-reflection"></div>
              </div>
            </div>

            <div className="car-hero-info">
              <div className="reveal active fade-left">
                <div className="badge-row">
                  <span className="car-category-badge">{car.category}</span>
                  {car.price_per_day > 100 && <span className="premium-badge"><i className="fas fa-crown"></i> Premium Fleet</span>}
                </div>
                <h1 className="car-name">{car.brand} {car.model}</h1>
                <div className="car-rating-strip">
                  <div className="stars">
                    <i className="fas fa-star"></i>
                    <i className="fas fa-star"></i>
                    <i className="fas fa-star"></i>
                    <i className="fas fa-star"></i>
                    <i className="fas fa-star-half-alt"></i>
                  </div>
                  <span>4.9 (150+ Verified Reviews)</span>
                </div>
                
                <div className="price-box-large">
                  <span className="price-val">${car.price_per_day || car.pricePerDay}</span>
                  <span className="price-unit">/ Day</span>
                </div>

                <p className="car-tagline">
                  Experience the pinnacle of {car.category} performance and comfort. This {car.brand} {car.model} represents the ultimate in automotive engineering.
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
                  {car.description || `This ${car.brand} ${car.model} offers an unparalleled driving experience. Whether you're navigating city streets or cruising the open road, this vehicle provides the perfect combination of power, elegance, and safety.`}
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
                    <span className="amount">${car.price_per_day || car.pricePerDay}</span>
                    <span className="per">/Day</span>
                  </div>
                </div>

                {!bookingSuccess ? (
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
                        <input type="date" name="pickup" value={dates.pickup} onChange={handleDateChange} />
                      </div>
                      <div className="input-field-vivid">
                        <label><i className="fas fa-calendar-check"></i> Return</label>
                        <input type="date" name="return" value={dates.return} onChange={handleDateChange} />
                      </div>
                    </div>

                    <div className="booking-summery-vivid">
                      <div className="summery-item">
                        <span>Base Rental Rate</span>
                        <span>${car.price_per_day || car.pricePerDay}</span>
                      </div>
                      <div className="summery-item total">
                        <span>Total Amount</span>
                        <span>${totalPrice}</span>
                      </div>
                    </div>

                    <button 
                      className="btn-book-now-ultimate" 
                      onClick={handleBooking}
                      disabled={bookingLoading || !dates.pickup || !dates.return}
                    >
                      {bookingLoading ? 'Processing...' : 'Reserve Now'} <i className="fas fa-chevron-right"></i>
                    </button>
                  </div>
                ) : (
                  <div className="booking-success-msg">
                    <i className="fas fa-check-circle"></i>
                    <h4>Reservation Sent!</h4>
                    <p>Your booking request for the {car.brand} {car.model} has been submitted successfully. You can track it in your dashboard.</p>
                  </div>
                )}

                <div className="console-footer-trust">
                  <div className="trust-badge">
                    <i className="fas fa-lock"></i>
                    <span>Secure</span>
                  </div>
                  <div className="trust-badge">
                    <i className="fas fa-shield-alt"></i>
                    <span>Insured</span>
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
