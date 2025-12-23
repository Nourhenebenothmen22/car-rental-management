import React from 'react';
import './Testimonial.css';
import { useScrollReveal } from '../../hooks/useScrollReveal';
import { assets } from '../../assets/assets';

function Testimonial() {
  const [ref, isVisible] = useScrollReveal();
  
  const testimonials = [
    {
      id: 1,
      name: "Alex Johnson",
      role: "Business Traveler",
      image: assets.testimonial_image_1,
      content: "The service was exceptional! The car was in perfect condition and the pickup process was so smooth. Highly recommended for anyone looking for luxury rentals.",
      rating: 5
    },
    {
      id: 2,
      name: "Sarah Miller",
      role: "Adventure Enthusiast",
      image: assets.testimonial_image_2,
      content: "Amazing experience! I rented an SUV for a weekend trip and it was the best decision. Premium cars and great customer support.",
      rating: 5
    }
  ];

  return (
    <section 
      ref={ref} 
      className={`testimonial-section reveal ${isVisible ? 'active fade-up' : ''}`}
    >
      <div className="container">
        <div className="testimonial-header">
          <span className="subtitle">Client Reviews</span>
          <h2>What Our Clients Say</h2>
          <p>We take pride in providing the best experience for our customers. Here's what some of them have to say.</p>
        </div>

        <div className="testimonial-grid">
          {testimonials.map((item) => (
            <div key={item.id} className="testimonial-card">
              <div className="quote-icon">"</div>
              <p className="testimonial-content">{item.content}</p>
              <div className="testimonial-footer">
                <div className="user-info">
                  <img src={item.image} alt={item.name} className="user-image" />
                  <div>
                    <h4>{item.name}</h4>
                    <span>{item.role}</span>
                  </div>
                </div>
                <div className="rating">
                  {[...Array(item.rating)].map((_, i) => (
                    <img key={i} src={assets.star_icon} alt="star" className="star" />
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Testimonial;
