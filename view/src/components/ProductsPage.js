// ProductsPage.js
import React, { useState, useEffect } from 'react';
import Header from './Header';
import Hero from './hero';
import ProductGrid from './ProductGrid';
import Banner from './Banner';
import FilterSidebar from './FilterSidebar';
import FilterDropdown from './FilterDropdown';
import SortBy from './SortBy';
import CategoryButtons from './CategoryButtons';
import '../assets/css/ProductsPage.css';

const ProductsPage = ({ selectedCollection = null }) => {
  // State for mobile filter
  const [isMobileFilterOpen, setIsMobileFilterOpen] = useState(false);
  
  // Reference to the FilterSidebar component
  const filterSidebarRef = React.useRef();
  
  // Handle selected category based on collection parameter
  const [activeCategory, setActiveCategory] = useState(selectedCollection || 'All products');

  // Set the active category when selectedCollection changes
  useEffect(() => {
    if (selectedCollection) {
      setActiveCategory(selectedCollection);
    }
  }, [selectedCollection]);
  
  const toggleMobileFilter = () => {
    setIsMobileFilterOpen(!isMobileFilterOpen);
    
    // Call the toggleMobileFilter method in the FilterSidebar component
    if (filterSidebarRef.current && filterSidebarRef.current.toggleMobileFilter) {
      filterSidebarRef.current.toggleMobileFilter();
    }
  };
  
  return (
    <div className="products-page">
      <div className="products-page__desktop">
        <Header />
        <Hero />
        
        {/* Mobile Category Filter and Sort layout - Only visible on mobile */}
        <div className='hero-br'></div>
        <div className="mobile-layout-container">
          {/* Category Buttons Row for Mobile */}
          <div className="mobile-category-wrapper">
            <CategoryButtons activeCategory={activeCategory} setActiveCategory={setActiveCategory} />
          </div>
          
          {/* Empty wrapper - Sort is now in the filter overlay */}
          <div className="mobile-filter-sort-wrapper">
            {/* Sort button removed - now included in filter overlay */}
          </div>
        </div>
        
        {/* Fixed mobile filter button at bottom left - only visible on mobile */}
        <button className="mobile-filter-btn" onClick={toggleMobileFilter}>
          <span>FILTERS & SORT</span>
          <img src={require("../assets/images/filter-icon.png")} alt="Filter" />
        </button>
        
        <div className="products-page__main">
          <FilterSidebar ref={filterSidebarRef} />
          <div className="products-page__content">
            <div className="category-and-sort desktop-only">
              <div className="category-container">
                <CategoryButtons activeCategory={activeCategory} setActiveCategory={setActiveCategory} />
              </div>
              <div className="filter-sort-container">
                <FilterDropdown />
                <SortBy />
              </div>
            </div>
            <div className="product-grid-container">
              <ProductGrid category={activeCategory} />
            </div>
            <Banner />
          </div>
        </div>
      </div>
    </div> 
  );
};

export default ProductsPage;
