import React, { useEffect } from 'react';
import { useCarStore } from '../../../store/car.store';
import { useBookingStore } from '../../../store/booking.store';
import { useAuthStore } from '../../../store/auth.store';
import { Link } from 'react-router-dom';
import { getImageUrl } from '../../../services/api';
import './OwnerDashboard.css';

const OwnerDashboard = () => {
  const { user } = useAuthStore();
  const { ownerCars, fetchOwnerCars } = useCarStore();
  const { bookings, fetchOwnerBookings } = useBookingStore();

  useEffect(() => {
    if (user?.id) {
      fetchOwnerCars(user.id);
      fetchOwnerBookings(user.id);
    }
  }, [user, fetchOwnerCars, fetchOwnerBookings]);

  // Calculate stats
  const totalCars = ownerCars.length;
  // Note: Backend booking response structure assumption: 'total_price', 'status'
  const totalRevenue = bookings
    .filter(b => b.status === 'confirmed' || b.status === 'completed')
    .reduce((acc, curr) => acc + (curr.total_price || 0), 0);
  
  const totalBookings = bookings.length;
  const pendingBookings = bookings.filter(b => b.status === 'pending').length;

  const stats = [
    { label: 'Total Revenue', value: `$${totalRevenue}`, icon: 'fa-dollar-sign', color: '#10b981' },
    { label: 'Total Cars', value: totalCars, icon: 'fa-car', color: '#3b82f6' },
    { label: 'Active Bookings', value: totalBookings, icon: 'fa-calendar-check', color: '#f59e0b' },
    { label: 'Pending', value: pendingBookings, icon: 'fa-clock', color: '#ef4444' }
  ];

  const recentBookings = bookings.slice(0, 5); // Show last 5

  return (
    <div className="owner-dashboard">
      <div className="stats-grid">
        {stats.map((stat, index) => (
          <div key={index} className="stat-card">
            <div className="stat-icon" style={{ backgroundColor: `${stat.color}15`, color: stat.color }}>
              <i className={`fas ${stat.icon}`}></i>
            </div>
            <div className="stat-info">
              <h3>{stat.value}</h3>
              <p>{stat.label}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="dashboard-sections">
        <div className="recent-bookings-card">
          <div className="card-header">
            <h2>Recent Bookings</h2>
            <Link to="/owner/bookings" className="view-all-btn">View All</Link>
          </div>
          <div className="table-container">
            <table>
              <thead>
                <tr>
                  <th>Car</th>
                  <th>Customer</th>
                  <th>Pickup</th>
                  <th>Total</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {recentBookings.map((booking, index) => (
                  <tr key={booking.id || index}>
                    <td>
                      <div className="car-cell">
                        <img src={getImageUrl(booking.car?.image)} alt="" />
                        <span>{booking.car?.brand} {booking.car?.model}</span>
                      </div>
                    </td>
                    <td>{booking.user?.email || 'N/A'}</td> 
                    <td>{new Date(booking.pickup_date).toLocaleDateString()}</td>
                    <td className="price-cell">${booking.total_price}</td>
                    <td>
                      <span className={`status-badge ${booking.status.toLowerCase()}`}>
                        {booking.status}
                      </span>
                    </td>
                  </tr>
                ))}
            </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OwnerDashboard;
