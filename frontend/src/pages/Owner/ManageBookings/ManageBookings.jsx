import React from 'react';
import { useBookingStore } from '../../../store/booking.store';
import { useAuthStore } from '../../../store/auth.store';
import { getImageUrl } from '../../../services/api';

const ManageBookings = () => {
    const { user } = useAuthStore();
    // 'bookings' state in store is populated by fetchOwnerBookings
    const { bookings, loading, fetchOwnerBookings } = useBookingStore();
    
    React.useEffect(() => {
        if (user?.id) {
             fetchOwnerBookings(user.id);
        }
    }, [user, fetchOwnerBookings]);

    const { updateBookingStatus } = useBookingStore();

    const handleStatusUpdate = (id, newStatus) => {
        if (window.confirm(`Are you sure you want to ${newStatus} this booking?`)) {
            updateBookingStatus(id, newStatus);
        }
    };

  return (
    <div className="manage-bookings">
      <div className="page-header">
        <div className="header-info">
          <h2>Order Management</h2>
          <p>You have {bookings.length} total reservations</p>
        </div>
        <div className="header-filters">
          <button className="filter-pill active">All</button>
          <button className="filter-pill">Pending</button>
          <button className="filter-pill">Confirmed</button>
        </div>
      </div>

      <div className="bookings-table-wrapper">
        {loading ? (
          <p style={{ textAlign: 'center', padding: '40px', color: '#64748b' }}>Loading bookings...</p>
        ) : bookings.length > 0 ? (
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
              {bookings.map((booking, index) => (
                <tr key={index}>
                  <td className="id-cell">#{String(booking.id || booking._id).slice(-6).toUpperCase()}</td>
                <td>
                  <div className="car-info-cell">
                    <img src={getImageUrl(booking.car?.image)} alt="" />
                    <div>
                      <p className="car-name">{booking.car?.brand} {booking.car?.model}</p>
                      <span className="car-type">{booking.car?.category}</span>
                    </div>
                  </div>
                </td>
                <td>{new Date(booking.pickup_date).toLocaleDateString()}</td>
                <td>{new Date(booking.return_date).toLocaleDateString()}</td>
                <td className="price-cell-admin">${booking.total_price}</td>
                <td>
                  <span className={`status-badge ${booking.status.toLowerCase()}`}>
                    {booking.status}
                  </span>
                </td>
                <td>
                    <div className="action-btns">
                      <button className="btn-action view" title="View Details">
                        <i className="fas fa-eye"></i>
                      </button>
                      {booking.status === 'pending' && (
                        <>
                          <button 
                            className="btn-action approve" 
                            title="Confirm Booking"
                            onClick={() => handleStatusUpdate(booking.id || booking._id, 'confirmed')}
                          >
                            <i className="fas fa-check"></i>
                          </button>
                          <button 
                            className="btn-action reject" 
                            title="Cancel Booking"
                            onClick={() => handleStatusUpdate(booking.id || booking._id, 'cancelled')}
                          >
                            <i className="fas fa-times"></i>
                          </button>
                        </>
                      )}
                    </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <div className="empty-state-admin" style={{ textAlign: 'center', padding: '60px 20px', color: '#64748b' }}>
          <i className="fas fa-calendar-times" style={{ fontSize: '3rem', marginBottom: '15px', color: '#cbd5e1', display: 'block' }}></i>
          <p style={{ fontSize: '1.1rem', fontWeight: '600' }}>No reservations found yet.</p>
        </div>
      )}
    </div>
  </div>
);
};

export default ManageBookings;
