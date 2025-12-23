import React from 'react';
import './About.css';
import { assets } from '../../assets/assets';
import { useScrollReveal } from '../../hooks/useScrollReveal';

const About = () => {
  const [headerRef, headerVisible] = useScrollReveal({ threshold: 0.1 });
  const [imageRef, imageVisible] = useScrollReveal({ threshold: 0.2 });
  const [statsRef, statsVisible] = useScrollReveal({ threshold: 0.3 });

  return (
    <section className="about-section-premium" id="about">
      <div className="about-bg-elements">
        <div className="blob blob-1"></div>
        <div className="blob blob-2"></div>
      </div>

      <div className="container">
        <div className="about-header-area" ref={headerRef}>
          <div className={`reveal ${headerVisible ? 'active fade-up' : ''}`}>
            <span className="premium-subtitle">The Art of Travel</span>
            <h2 className="premium-title">Elevating Every <br /><span>Mile of Your Journey</span></h2>
          </div>
        </div>

        <div className="about-grid-premium">
          <div 
            className={`about-visual-side reveal ${imageVisible ? 'active fade-right' : ''}`}
            ref={imageRef}
          >
            <div className="visual-compose">
              <div className="main-image-frame">
                <img src={assets.about_us_hero_car} alt="Premium Experience" className="visual-img" />
                <div className="image-overlay-gradient"></div>
              </div>
              
              <div className="glass-stats-card stagger-1">
                <div className="icon-circle">
                  <i className="fas fa-gem"></i>
                </div>
                <div className="glass-stats-info">
                  <h4>Exclusive Fleet</h4>
                  <p>Hand-picked luxury vehicles.</p>
                </div>
              </div>

              <div className="floating-experience stagger-2">
                <div className="exp-number">15</div>
                <div className="exp-text">Years Of <br />Trust</div>
              </div>
            </div>
          </div>

          <div 
            className={`about-text-side reveal ${imageVisible ? 'active fade-left' : ''}`}
          >
            <p className="premium-description">
              At CarRental, we don't just rent cars; we curate experiences. 
              Our legacy is built on the belief that freedom starts with a key 
              and a road that stretches toward the horizon. 
            </p>

            <div className="benefits-grid">
              <div className="benefit-card">
                <div className="benefit-icon">
                  <i className="fas fa-fingerprint"></i>
                </div>
                <h5>Personalized Service</h5>
                <p>Tailored rental solutions for your unique lifestyle.</p>
              </div>
              <div className="benefit-card">
                <div className="benefit-icon">
                  <i className="fas fa-bolt"></i>
                </div>
                <h5>Instant Booking</h5>
                <p>Zero friction. Your dream car is just two clicks away.</p>
              </div>
              <div className="benefit-card">
                <div className="benefit-icon">
                  <i className="fas fa-award"></i>
                </div>
                <h5>Premium Only</h5>
                <p>We only host the highest graded vehicles in the market.</p>
              </div>
              <div className="benefit-card">
                <div className="benefit-icon">
                  <i className="fas fa-headset"></i>
                </div>
                <h5>Elite Concierge</h5>
                <p>A dedicated team to handle your every requirement.</p>
              </div>
            </div>

            <div className="about-cta-wrapper">
              <button className="premium-btn-primary">
                Explore Our Vision <i className="fas fa-arrow-right"></i>
              </button>
            </div>
          </div>
        </div>

        <div 
          className={`about-stats-strip reveal ${statsVisible ? 'active fade-up' : ''}`}
          ref={statsRef}
        >
          <div className="stat-item">
            <span className="stat-num">500+</span>
            <span className="stat-label">Luxury Vehicles</span>
          </div>
          <div className="stat-item separator"></div>
          <div className="stat-item">
            <span className="stat-num">12k+</span>
            <span className="stat-label">Verified Members</span>
          </div>
          <div className="stat-item separator"></div>
          <div className="stat-item">
            <span className="stat-num">50+</span>
            <span className="stat-label">Global Cities</span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
