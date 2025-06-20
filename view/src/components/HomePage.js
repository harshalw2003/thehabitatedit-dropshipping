// HomePage.js
import React from 'react';
import Header from './Header';
import Hero from './hero';
import Sidebar from './Sidebar';
import ProductGrid from './ProductGrid';
import Banner from './Banner';
import BestSellers from './BestSellers';
import MobileMenu from './MobileMenu';
import '../assets/css/HomePage.css';

const HomePage = () => (
  <div className="homepage">
    <div className="homepage__desktop">
      <Header />
      <Hero/>
      <div className="homepage__main">
        <Sidebar />
        <div className="homepage__content">
          <ProductGrid />
          <Banner />
        </div>
      </div>
    </div>
    <div className="homepage__mobile">
      <MobileMenu />
      <BestSellers />
    </div>
  </div>
);

export default HomePage;
