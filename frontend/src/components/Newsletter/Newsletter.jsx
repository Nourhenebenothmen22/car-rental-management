import React from 'react';
import './Newsletter.css';
import { useScrollReveal } from '../../hooks/useScrollReveal';

function Newsletter() {
  const [ref, isVisible] = useScrollReveal();

  return (
    <section 
      ref={ref} 
      className={`newsletter-section reveal ${isVisible ? 'active zoom-in' : ''}`}
    >
      <div className="container">
        <div className="newsletter-card">
          <div className="newsletter-content">
            <h2>Stay in the Loop</h2>
            <p>Subscribe to our newsletter to receive exclusive offers, new arrivals, and luxury travel tips directly to your inbox.</p>
          </div>
          <form className="newsletter-form" onSubmit={(e) => e.preventDefault()}>
            <div className="form-group">
              <input type="email" placeholder="Enter your email address" required />
              <button type="submit">Subscribe Now</button>
            </div>
            <span className="form-note">By subscribing, you agree to our Terms of Service and Privacy Policy.</span>
          </form>
        </div>
      </div>
    </section>
  );
}

export default Newsletter;
