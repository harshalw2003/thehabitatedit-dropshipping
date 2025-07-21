// HomePage.js
import React from 'react';
import Header from './Header';
import Hero from './hero';
// import Sidebar from './Sidebar';
import ProductGrid from './ProductGrid';
import Banner from './Banner';
import BestSellers from './BestSellers';
import MobileMenu from './MobileMenu';
import '../assets/css/HomePage.css';
import SortBy from './SortBy';
import FilterSidebar from './FilterSidebar';



const HomePage = () => (
  <div className="homepage">
    <div className="homepage__desktop">
      <Header />
      <Hero/>
      <div className="homepage__main">
      <FilterSidebar />
        <div className="homepage__content">
          <SortBy />
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
