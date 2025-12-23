import React from 'react';
import { Link } from 'react-router-dom';
import { dummyMyBookingsData } from '../../assets/assets';
import './MyBookings.css';
import { useScrollReveal } from '../../hooks/useScrollReveal';

const MyBookings = () => {
  const [headerRef, headerVisible] = useScrollReveal({ threshold: 0.1 });
  const [gridRef, gridVisible] = useScrollReveal({ threshold: 0.1 });

  return (
    <div className="my-bookings-page">
      <div className="container">
        <header className="page-header" ref={headerRef}>
          <div className={`reveal ${headerVisible ? 'active fade-up' : ''}`}>
            <h1>My Bookings</h1>
            <p>Track and manage your car rental reservations</p>
          </div>
        </header>

        <div className="bookings-grid" ref={gridRef}>
          {dummyMyBookingsData.length > 0 ? (
            dummyMyBookingsData.map((booking, index) => (
              <div 
                key={index} 
                className={`booking-card reveal ${gridVisible ? 'active fade-up' : ''}`} 
                style={{ transitionDelay: `${index * 0.1}s` }}
              >
                <div className="booking-image">
                  <img src={booking.car.image} alt={booking.car.brand} />
                  <div className={`status-badge ${booking.status.toLowerCase()}`}>
                    {booking.status}
                  </div>
                </div>
                
                <div className="booking-content">
                  <div className="car-info">
                    <h3>{booking.car.brand} {booking.car.model}</h3>
                    <span className="car-category">{booking.car.category}</span>
                  </div>

                  <div className="booking-details">
                    <div className="detail-item">
                      <i className="fas fa-calendar-alt"></i>
                      <div>
                        <span>Pickup</span>
                        <p>{new Date(booking.pickupDate).toLocaleDateString(undefined, { day: 'numeric', month: 'short', year: 'numeric' })}</p>
                      </div>
                    </div>
                    <div className="detail-item">
                      <i className="fas fa-calendar-check"></i>
                      <div>
                        <span>Return</span>
                        <p>{new Date(booking.returnDate).toLocaleDateString(undefined, { day: 'numeric', month: 'short', year: 'numeric' })}</p>
                      </div>
                    </div>
                  </div>

                  <div className="booking-footer">
                    <div className="total-price">
                      <span>Total Amount</span>
                      <h3>${booking.price}</h3>
                    </div>
                    <div className="booking-actions">
                      <Link to={`/car/${booking.car._id}`} className="btn-secondary">View Details</Link>
                      {booking.status === 'confirmed' && (
                        <button className="btn-outline-danger">Cancel</button>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="empty-bookings">
              <i className="fas fa-calendar-times"></i>
              <h3>No Bookings Found</h3>
              <p>You haven't made any reservations yet. Start exploring our fleet!</p>
              <button className="btn-primary">Browse Cars</button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default MyBookings;
