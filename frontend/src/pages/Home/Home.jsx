import React, { useEffect } from 'react'
import CarSearch from '../../components/CarSearch/CarSearch'
import CarList from '../../components/CarList/CarList'
import Banner from '../../components/Banner/Banner'
import Testimonial from '../../components/Testimonial/Testimonial'
import Newsletter from '../../components/Newsletter/Newsletter'
import About from '../../components/About/About'
import './Home.css'

function Home() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="home-page">
      <CarSearch />
      
      <div className="gradient-section">
        <CarList limit={6} />
        <About />
        <Banner />
        <Testimonial />
        <Newsletter />
      </div>
      
    </div>
  );
}

export default Home