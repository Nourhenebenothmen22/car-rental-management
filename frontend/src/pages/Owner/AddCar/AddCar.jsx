import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { cityList } from '../../../assets/assets';
import { useCarStore } from '../../../store/car.store';
import { useAuthStore } from '../../../store/auth.store';
import './AddCar.css';

const AddCar = () => {
  const navigate = useNavigate();
  const { user } = useAuthStore();
  const { addCar, loading } = useCarStore();
  
  const [formData, setFormData] = useState({
    brand: '',
    model: '',
    year: new Date().getFullYear(),
    location: cityList[0] || '',
    price_per_day: '',
    category: 'Sedan',
    transmission: 'Automatic',
    fuel_type: 'Petrol',
    description: ''
  });
  
  const [imageFile, setImageFile] = useState(null);
  const [error, setError] = useState('');

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleImageChange = (e) => {
    setImageFile(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!user?.id) {
       setError("You must be logged in to add a car.");
       return;
    }

    if (!imageFile) {
        setError("Please select an image for the car.");
        return;
    }

    const data = new FormData();
    data.append('brand', formData.brand);
    data.append('model', formData.model);
    data.append('year', formData.year);
    data.append('category', formData.category);
    data.append('price_per_day', formData.price_per_day);
    data.append('location', formData.location);
    data.append('transmission', formData.transmission);
    data.append('fuel_type', formData.fuel_type);
    data.append('description', formData.description || '');
    data.append('owner_id', user.id);
    data.append('image', imageFile);

    try {
      await addCar(data);
      navigate('/owner/cars');
    } catch (err) {

      setError("Failed to add car. Please try again.");
    }
  };

  return (
    <div className="add-car-page">
      <div className="page-header">
        <h2>List New Vehicle</h2>
        <p>Fill in the details to add a car to your rental fleet</p>
      </div>

      <div className="form-card">
        {error && <div className="error-message" style={{color: 'red', marginBottom: '1rem'}}>{error}</div>}
        <form className="admin-form" onSubmit={handleSubmit}>
          <section className="form-section">
            <h3>Basic Information</h3>
            <div className="form-grid">
              <div className="form-group">
                <label>Car Brand</label>
                <input 
                  type="text" 
                  name="brand" 
                  placeholder="e.g. BMW" 
                  value={formData.brand}
                  onChange={handleChange}
                  required 
                />
              </div>
              <div className="form-group">
                <label>Model Name</label>
                <input 
                  type="text" 
                  name="model" 
                  placeholder="e.g. X5" 
                  value={formData.model}
                  onChange={handleChange}
                  required 
                />
              </div>
              <div className="form-group">
                <label>Year</label>
                <input 
                  type="number" 
                  name="year" 
                  placeholder="2024"
                  value={formData.year}
                  onChange={handleChange} 
                />
              </div>
              <div className="form-group">
                <label>Location</label>
                <select name="location" value={formData.location} onChange={handleChange}>
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
                <input 
                  type="number" 
                  name="price_per_day" 
                  placeholder="150" 
                  value={formData.price_per_day}
                  onChange={handleChange}
                  required 
                />
              </div>
              <div className="form-group">
                <label>Category</label>
                <select name="category" value={formData.category} onChange={handleChange}>
                  <option>SUV</option>
                  <option>Sedan</option>
                  <option>Luxury</option>
                  <option>Sports</option>
                </select>
              </div>
              <div className="form-group">
                <label>Transmission</label>
                <select name="transmission" value={formData.transmission} onChange={handleChange}>
                  <option>Automatic</option>
                  <option>Manual</option>
                </select>
              </div>
              <div className="form-group">
                <label>Fuel Type</label>
                <select name="fuel_type" value={formData.fuel_type} onChange={handleChange}>
                  <option>Petrol</option>
                  <option>Diesel</option>
                  <option>Electric</option>
                  <option>Hybrid</option>
                </select>
              </div>
               <div className="form-group">
                <label>Car Image</label>
                <input 
                  type="file" 
                  accept="image/*"
                  onChange={handleImageChange}
                  required 
                />
              </div>
            </div>
          </section>

          <div className="form-footer">
            <button type="button" className="cancel-btn" onClick={() => navigate('/owner/cars')}>Discard</button>
            <button type="submit" className="submit-btn-admin" disabled={loading}>
                {loading ? 'Publishing...' : 'Publish Vehicle'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddCar;
