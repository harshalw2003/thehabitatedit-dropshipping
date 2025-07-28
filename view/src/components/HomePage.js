// HomePage.js
import React from 'react';
import { Link } from 'react-router-dom';
import Header from './Header';
import Hero from './hero';
import Banner from './Banner';
import BestSellers from './BestSellers';
import Collections from './Collections';
import '../assets/css/HomePage.css';

const HomePage = () => {
  return (
    <div className="homepage">
      <div className="homepage__desktop">
        <Header />
        <Hero />

        <div className='hero-br'></div>
        
        {/* Browse All Products Button */}
        
        
        {/* Bestseller Products Section */}
        <BestSellers />
        
        {/* Collections Section */}
        <Collections />
        
        {/* Banner */}
        <Banner />
      </div>
    </div> 
  );
};


export default HomePage;
