import React from 'react';
import { dummyCarData } from '../../../assets/assets';
import './ManageCars.css';

const ManageCars = () => {
  return (
    <div className="manage-cars">
      <div className="page-header">
        <div className="header-info">
          <h2>My Fleet</h2>
          <p>You have {dummyCarData.length} vehicles listed</p>
        </div>
        <button className="add-car-header-btn">
          <i className="fas fa-plus"></i>
          Add New Car
        </button>
      </div>

      <div className="cars-data-grid">
        {dummyCarData.map((car, index) => (
          <div key={index} className="admin-car-card">
            <div className="car-img-wrapper">
              <img src={car.image} alt={car.brand} />
              <div className={`status-pill ${car.isAvaliable ? 'available' : 'booked'}`}>
                {car.isAvaliable ? 'Available' : 'Booked'}
              </div>
            </div>
            <div className="car-details">
              <h3>{car.brand} {car.model}</h3>
              <p className="car-loc"><i className="fas fa-map-marker-alt"></i> {car.location}</p>
              
              <div className="car-stats-mini">
                <div className="mini-stat">
                  <span>${car.pricePerDay}</span>
                  <small>/Day</small>
                </div>
                <div className="mini-stat">
                  <span>{car.transmission}</span>
                </div>
              </div>

              <div className="car-actions">
                <button className="edit-action"><i className="fas fa-edit"></i> Edit</button>
                <button className="delete-action"><i className="fas fa-trash"></i></button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ManageCars;
