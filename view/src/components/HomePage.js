// HomePage.js
import React from 'react';
import { Link } from 'react-router-dom';
import Header from './Header';
import Hero from './hero';
import Footer from './Footer';
import BestSellers from './BestSellers';
import Collections from './Collections';
import '../assets/css/HomePage.css';
import ProductGrid from './ProductGrid';

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
        {/* <div className='hero-br'></div> */}

        
        {/* Collections Section */}
        <Collections />
        

        {/* <ProductGrid /> */}
        {/* Footer */}
        <Footer />
      </div>
    </div> 
  );
};


export default HomePage;
