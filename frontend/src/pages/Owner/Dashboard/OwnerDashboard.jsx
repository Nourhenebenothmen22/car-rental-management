import React from 'react';
import { dummyDashboardData } from '../../../assets/assets';
import './OwnerDashboard.css';

const OwnerDashboard = () => {
  const stats = [
    { label: 'Total Revenue', value: `$${dummyDashboardData.monthlyRevenue}`, icon: 'fa-dollar-sign', color: '#10b981' },
    { label: 'Total Cars', value: dummyDashboardData.totalCars, icon: 'fa-car', color: '#3b82f6' },
    { label: 'Active Bookings', value: dummyDashboardData.totalBookings, icon: 'fa-calendar-check', color: '#f59e0b' },
    { label: 'Pending', value: dummyDashboardData.pendingBookings, icon: 'fa-clock', color: '#ef4444' }
  ];

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
            <button className="view-all-btn">View All</button>
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
                {dummyDashboardData.recentBookings.map((booking, index) => (
                  <tr key={index}>
                    <td>
                      <div className="car-cell">
                        <img src={booking.car.image} alt="" />
                        <span>{booking.car.brand} {booking.car.model}</span>
                      </div>
                    </td>
                    <td>Customer Name</td>
                    <td>{new Date(booking.pickupDate).toLocaleDateString()}</td>
                    <td className="price-cell">${booking.price}</td>
                    <td>
                      <span className={`status-badge ${booking.status}`}>
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
