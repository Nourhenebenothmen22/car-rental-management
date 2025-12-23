import React from 'react';
import { Outlet } from 'react-router-dom'; 
import Navbar from '../navbar/Navbar';
import Footer from '../footer/Footer';

function MainLayout() {
  return (
    <>
      <Navbar />
      <Outlet /> {/* This will render the nested routes */}
      <Footer />
    </>
  );
}

export default MainLayout;
