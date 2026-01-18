import React from 'react';
import './CarList.css';
import CarCard from '../CarCard/CarCard';
import { Link } from 'react-router-dom';
import { useScrollReveal } from '../../hooks/useScrollReveal';
import { useCarStore } from '../../store/car.store';

function CarList({ limit = 100 }) {
  const [ref, isVisible] = useScrollReveal();
  // Use store state and actions
  const { cars, loading, fetchCars } = useCarStore();

  React.useEffect(() => {
    fetchCars(0, limit);
  }, [limit, fetchCars]);


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
        {loading ? (
          <p style={{ gridColumn: '1/-1', textAlign: 'center', padding: '40px', color: '#64748b' }}>Loading luxury fleet...</p>
        ) : cars.length > 0 ? (
          cars.map((car) => (
            <CarCard key={car.id} car={car} />
          ))
        ) : (
          <p style={{ gridColumn: '1/-1', textAlign: 'center', padding: '40px', color: '#64748b' }}>No cars available at the moment.</p>
        )}
      </div>
    </section>
  );
}

export default CarList;
