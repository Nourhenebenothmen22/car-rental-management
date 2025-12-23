import React from 'react';
import './Banner.css';
import { useScrollReveal } from '../../hooks/useScrollReveal';
import { assets } from '../../assets/assets';

function Banner() {
  const [ref, isVisible] = useScrollReveal();

  return (
    <section className="banner-section">
      <div 
        ref={ref} 
        className={`banner-container reveal ${isVisible ? 'active zoom-in' : ''}`}
      >
        <div className="banner-card">
          <div className="banner-content">
            <span className="badge">Become a Host</span>
            <h2>Earn Big with Your Car</h2>
            <p>List your vehicle on our platform and start earning extra income today. Join thousands of successful hosts worldwide.</p>
            <div className="banner-btns">
              <button className="primary-btn">List Your Car</button>
              <button className="secondary-btn">Learn More</button>
            </div>
          </div>
          <div className="banner-img">
            <img src={assets.banner_car_image} alt="Host with us" />
          </div>
        </div>
      </div>
    </section>
  );
}

export default Banner;
