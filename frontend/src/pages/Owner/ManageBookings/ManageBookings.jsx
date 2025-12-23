import React from 'react';
import { dummyMyBookingsData } from '../../../assets/assets';
import './ManageBookings.css';

const ManageBookings = () => {
  return (
    <div className="manage-bookings">
      <div className="page-header">
        <div className="header-info">
          <h2>Order Management</h2>
          <p>You have {dummyMyBookingsData.length} total reservations</p>
        </div>
        <div className="header-filters">
          <button className="filter-pill active">All</button>
          <button className="filter-pill">Pending</button>
          <button className="filter-pill">Confirmed</button>
        </div>
      </div>

      <div className="bookings-table-wrapper">
        <table className="admin-table">
          <thead>
            <tr>
              <th>Order ID</th>
              <th>Vehicle</th>
              <th>Pickup Date</th>
              <th>Return Date</th>
              <th>Total Price</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {dummyMyBookingsData.map((booking, index) => (
              <tr key={index}>
                <td className="id-cell">#{booking._id.slice(-6).toUpperCase()}</td>
                <td>
                  <div className="car-info-cell">
                    <img src={booking.car.image} alt="" />
                    <div>
                      <p className="car-name">{booking.car.brand} {booking.car.model}</p>
                      <span className="car-type">{booking.car.category}</span>
                    </div>
                  </div>
                </td>
                <td>{new Date(booking.pickupDate).toLocaleDateString()}</td>
                <td>{new Date(booking.returnDate).toLocaleDateString()}</td>
                <td className="price-cell-admin">${booking.price}</td>
                <td>
                  <span className={`status-tag ${booking.status}`}>
                    {booking.status}
                  </span>
                </td>
                <td>
                  <div className="action-btns">
                    <button className="btn-action view" title="View Details">
                      <i className="fas fa-eye"></i>
                    </button>
                    <button className="btn-action approve" title="Confirm Booking">
                      <i className="fas fa-check"></i>
                    </button>
                    <button className="btn-action reject" title="Cancel Booking">
                      <i className="fas fa-times"></i>
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ManageBookings;
