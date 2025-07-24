// HomePage.js
import React, { useState, forwardRef } from 'react';
import Header from './Header';
import Hero from './hero';
// import Sidebar from './Sidebar';
import ProductGrid from './ProductGrid';
import Banner from './Banner';
import BestSellers from './BestSellers';
import MobileMenu from './MobileMenu';
import '../assets/css/HomePage.css';
import SortBy from './SortBy';
import SearchBar from './SearchBar';
import FilterSidebar from './FilterSidebar';



const HomePage = () => {
  // This state is only for reference - the actual filter state is managed by the FilterSidebar component
  const [isMobileFilterOpen, setIsMobileFilterOpen] = useState(false);
  
  // Reference to the FilterSidebar component
  const filterSidebarRef = React.useRef();
  
  const toggleMobileFilter = () => {
    setIsMobileFilterOpen(!isMobileFilterOpen);
    
    // Call the toggleMobileFilter method in the FilterSidebar component
    if (filterSidebarRef.current && filterSidebarRef.current.toggleMobileFilter) {
      filterSidebarRef.current.toggleMobileFilter();
    }
  };
  
  return (
  <div className="homepage">
    <div className="homepage__desktop">
      <Header />
      <Hero/>
      
      {/* Mobile Search and Filter layout - Only visible on mobile */}
      <div className="mobile-layout-container">
        {/* Search Bar Row */}
        <div className="mobile-search-bar-wrapper">
          <SearchBar />
        </div>
        
        {/* Filter and Sort Buttons Row */}
        <div className="mobile-filter-sort-wrapper">
          <button className="mobile-filter-btn" onClick={toggleMobileFilter}>
            <span>FILTERS</span>
            <img src={require("../assets/images/filter-icon.png")} alt="Filter" />
          </button>
          
          <div className="mobile-sort-btn">
            <SortBy />
          </div>
        </div>
      </div>
      
      <div className="homepage__main">
        <FilterSidebar ref={filterSidebarRef} />
        <div className="homepage__content">
          <div className="search-and-sort desktop-only">
            <SearchBar />
            <SortBy />
          </div>
          <ProductGrid />
          <Banner />
        </div>
      </div>
    </div>
    {/* <div className="homepage__mobile">
      <MobileMenu />
      <BestSellers />
    </div> */}
    
    {/* Mobile Filter Overlay */}
    <div className={`mobile-filter-overlay ${isMobileFilterOpen ? 'open' : ''}`} onClick={toggleMobileFilter}></div>
    
  </div> 
  );
};

export default HomePage;
