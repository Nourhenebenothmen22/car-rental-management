import React from 'react';
import './CarList.css';
import CarCard from '../CarCard/CarCard';
import { dummyCarData } from '../../assets/assets';
import { Link } from 'react-router-dom';
import { useScrollReveal } from '../../hooks/useScrollReveal';

function CarList() {
  const [ref, isVisible] = useScrollReveal();

  return (
    <section 
      ref={ref} 
      className={`car-list-section container reveal ${isVisible ? 'active fade-up' : ''}`}
    >
      <div className="section-header">
        <div className="title-area">
          <span className="subtitle">Exploration</span>
          <h2>Our Most Popular Cars</h2>
        </div>
        <Link to="/cars" className="view-all-btn">View All Cars</Link>
      </div>

      <div className="car-grid">
        {dummyCarData.map((car) => (
          <CarCard key={car._id} car={car} />
        ))}
      </div>
    </section>
  );
}

export default CarList;
