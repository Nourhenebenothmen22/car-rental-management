import React from 'react';
import { Link } from 'react-router-dom';
import { useBookingStore } from '../../store/booking.store';
import { useAuthStore } from '../../store/auth.store';
import { useScrollReveal } from '../../hooks/useScrollReveal';
import { getImageUrl } from '../../services/api';
import './MyBookings.css'

const MyBookings = () => {
  const [headerRef, headerVisible] = useScrollReveal({ threshold: 0.1 });
  const [gridRef, gridVisible] = useScrollReveal({ threshold: 0.1 });
  
  const { user } = useAuthStore();
  const { userBookings: bookings, loading, fetchUserBookings } = useBookingStore();

  React.useEffect(() => {
    if (user?.id) {
        fetchUserBookings(user.id);
    }
  }, [user, fetchUserBookings]);

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
          {loading ? (
            <div className="loading-state" style={{ textAlign: 'center', padding: '100px 0' }}>
              <div className="loader"></div>
              <p style={{ marginTop: '20px', color: '#64748b' }}>Fetching your premium reservations...</p>
            </div>
          ) : bookings.length > 0 ? (
            bookings.map((booking, index) => (
              <div 
                key={booking.id || index} 
                className={`booking-card-premium reveal ${gridVisible ? 'active fade-up' : ''}`} 
                style={{ transitionDelay: `${index * 0.1}s` }}
              >
                <div className="card-media-sidebar">
                  <img src={getImageUrl(booking.car?.image)} alt={booking.car?.brand} />
                  <div className="media-overlay-gradient"></div>
                </div>

                <div className="card-content-body">
                  <div className="card-top-row">
                    <div className="car-identity">
                      <div className="brand-model-row" style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                        <h3>{booking.car?.brand} {booking.car?.model}</h3>
                        <span className={`status-pill-inline ${booking.status.toLowerCase()}`}>
                          {booking.status}
                        </span>
                      </div>
                      <span className="booking-ref">#{String(booking.id).slice(-6).toUpperCase()}</span>
                      <div className="car-badges">
                        <span className="spec-badge"><i className="fas fa-car"></i> {booking.car?.category}</span>
                        {booking.car?.transmission && <span className="spec-badge"><i className="fas fa-cog"></i> {booking.car.transmission}</span>}
                      </div>
                    </div>
                    <div className="price-display">
                      <span className="label">Total Paid</span>
                      <span className="amount">${booking.total_price}</span>
                    </div>
                  </div>

                  <div className="travel-timeline">
                    <div className="timeline-point start">
                      <div className="date-group">
                        <span className="label">Pick-up</span>
                        <span className="date-value">{new Date(booking.pickup_date).toLocaleDateString("fr-FR", { day: 'numeric', month: 'short', year: 'numeric' })}</span>
                      </div>
                    </div>
                    
                    <div className="timeline-connector">
                      <div className="line"></div>
                      <div className="duration-pill">
                        {Math.ceil(Math.abs(new Date(booking.return_date) - new Date(booking.pickup_date)) / (1000 * 60 * 60 * 24))} Days
                      </div>
                    </div>

                    <div className="timeline-point end">
                      <div className="date-group">
                        <span className="label">Return</span>
                        <span className="date-value">{new Date(booking.return_date).toLocaleDateString("fr-FR", { day: 'numeric', month: 'short', year: 'numeric' })}</span>
                      </div>
                    </div>
                  </div>

                  <div className="card-actions-footer">
                    <Link to={`/car/${booking.car?.id}`} className="action-btn view">
                      View Vehicle <i className="fas fa-arrow-right"></i>
                    </Link>
                    {booking.status === 'confirmed' && (
                      <button className="action-btn cancel">Cancel Booking</button>
                    )}
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="empty-bookings">
              <i className="fas fa-calendar-times"></i>
              <h3>No Bookings Found</h3>
              <p>You haven't made any reservations yet. Start exploring our fleet!</p>
              <Link to="/cars" className="btn-primary-link">Browse Cars</Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default MyBookings;
