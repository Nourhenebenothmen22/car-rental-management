import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom'; // use BrowserRouter
import Login from './pages/Auth/login/Login';
import Register from './pages/Auth/register/Register';
import Home from './pages/Home/Home';
import Cars from './pages/Cars/Cars';
import CarDetail from './pages/CarDetail/CarDetail';
import MyBookings from './pages/MyBookings/MyBookings';
import MainLayout from './components/layout/MainLayout';
import AdminLayout from './components/layout/AdminLayout';
import OwnerDashboard from './pages/Owner/Dashboard/OwnerDashboard';
import ManageCars from './pages/Owner/ManageCars/ManageCars';
import AddCar from './pages/Owner/AddCar/AddCar';
import ManageBookings from './pages/Owner/ManageBookings/ManageBookings';
import Unauthorized from './pages/unauthorized/Unauthorized';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Public routes */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/unauthorized" element={<Unauthorized />} />

        {/* Home & General routes */}
        <Route element={<MainLayout />}>
          <Route path="/" element={<Home />} />
          <Route path="/cars" element={<Cars />} />
          <Route path="/car/:id" element={<CarDetail />} />
          <Route path="/my-bookings" element={<MyBookings />} />
        </Route>

        {/* Owner/Admin routes */}
        <Route path="/owner" element={<AdminLayout />}>
          <Route index element={<OwnerDashboard />} />
          <Route path="dashboard" element={<OwnerDashboard />} />
          <Route path="manage-cars" element={<ManageCars />} />
          <Route path="add-car" element={<AddCar />} />
          <Route path="manage-bookings" element={<ManageBookings />} />
          {/* Fallback for car management variants */}
          <Route path="cars" element={<ManageCars />} />
          <Route path="bookings" element={<ManageBookings />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
