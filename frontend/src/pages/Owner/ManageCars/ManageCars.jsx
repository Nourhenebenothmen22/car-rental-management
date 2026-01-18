import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useCarStore } from '../../../store/car.store';
import { useAuthStore } from '../../../store/auth.store';
import { getImageUrl } from '../../../services/api';
import './ManageCars.css';

const ManageCars = () => {
  const { user } = useAuthStore();
  const { ownerCars, loading, fetchOwnerCars } = useCarStore();

  useEffect(() => {
    if (user?.id) {
      fetchOwnerCars(user.id);
    }
  }, [user, fetchOwnerCars]);

  return (
    <div className="manage-cars">
      <div className="page-header">
        <div className="header-info">
          <h2>My Fleet</h2>
          <p>You have {ownerCars.length} vehicles listed</p>
        </div>
        <Link to="/owner/add-car" className="add-car-header-btn">
          <i className="fas fa-plus"></i>
          Add New Car
        </Link>
      </div>

      <div className="cars-data-grid">
        {loading ? (
           <p style={{ textAlign: 'center', width: '100%', padding: '40px', color: '#64748b' }}>Loading your fleet...</p>
        ) : ownerCars.length > 0 ? (
          ownerCars.map((car, index) => (
            <div key={car.id || index} className="admin-car-card">
              <div className="car-img-wrapper">
                <img src={getImageUrl(car.image)} alt={car.brand} />
                <div className={`status-pill ${car.is_available ? 'available' : 'booked'}`}>
                  {car.is_available ? 'Available' : 'Booked'}
                </div>
              </div>
              <div className="car-details">
                <h3>{car.brand} {car.model}</h3>
                <p className="car-loc"><i className="fas fa-map-marker-alt"></i> {car.location}</p>
                
                <div className="car-stats-mini">
                  <div className="mini-stat">
                    <span>${car.price_per_day}</span>
                    <small>/Day</small>
                  </div>
                  <div className="mini-stat">
                    <span>{car.transmission || 'Auto'}</span>
                  </div>
                </div>

                <div className="car-actions">
                  <button className="edit-action"><i className="fas fa-edit"></i> Edit</button>
                  <button className="delete-action"><i className="fas fa-trash"></i></button>
                </div>
              </div>
            </div>
          ))
        ) : (
           <div className="empty-fleet" style={{ textAlign: 'center', padding: '40px', gridColumn: '1/-1' }}>
             <p>No cars found. Add your first vehicle!</p>
           </div>
        )}
      </div>
    </div>
  );
};

export default ManageCars;
