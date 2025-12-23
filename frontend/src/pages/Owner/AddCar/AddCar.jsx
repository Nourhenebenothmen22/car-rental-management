import React from 'react';
import { cityList } from '../../../assets/assets';
import './AddCar.css';

const AddCar = () => {
  return (
    <div className="add-car-page">
      <div className="page-header">
        <h2>List New Vehicle</h2>
        <p>Fill in the details to add a car to your rental fleet</p>
      </div>

      <div className="form-card">
        <form className="admin-form" onSubmit={(e) => e.preventDefault()}>
          <section className="form-section">
            <h3>Basic Information</h3>
            <div className="form-grid">
              <div className="form-group">
                <label>Car Brand</label>
                <input type="text" placeholder="e.g. BMW" required />
              </div>
              <div className="form-group">
                <label>Model Name</label>
                <input type="text" placeholder="e.g. X5" required />
              </div>
              <div className="form-group">
                <label>Year</label>
                <input type="number" placeholder="2024" />
              </div>
              <div className="form-group">
                <label>Location</label>
                <select>
                  {cityList.map((city, idx) => (
                    <option key={idx} value={city}>{city}</option>
                  ))}
                </select>
              </div>
            </div>
          </section>

          <section className="form-section">
            <h3>Pricing & Category</h3>
            <div className="form-grid">
              <div className="form-group">
                <label>Price Per Day ($)</label>
                <input type="number" placeholder="150" required />
              </div>
              <div className="form-group">
                <label>Category</label>
                <select>
                  <option>SUV</option>
                  <option>Sedan</option>
                  <option>Luxury</option>
                  <option>Sports</option>
                </select>
              </div>
              <div className="form-group">
                <label>Transmission</label>
                <select>
                  <option>Automatic</option>
                  <option>Manual</option>
                </select>
              </div>
              <div className="form-group">
                <label>Fuel Type</label>
                <select>
                  <option>Petrol</option>
                  <option>Diesel</option>
                  <option>Electric</option>
                  <option>Hybrid</option>
                </select>
              </div>
            </div>
          </section>

          <div className="form-footer">
            <button type="button" className="cancel-btn">Discard</button>
            <button type="submit" className="submit-btn-admin">Publish Vehicle</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddCar;
