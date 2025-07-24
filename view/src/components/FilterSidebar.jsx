import React, { useEffect, useState, forwardRef, useImperativeHandle } from "react";
import "../assets/css/FilterSidebar.css";
import "../assets/css/FilterOptions.css";
import "../assets/css/LoadingAnimations.css"; // Import loading animations

const FilterSidebar = forwardRef((props, ref) => {
  const [isMobileFilterOpen, setIsMobileFilterOpen] = useState(false);
  const [collections, setCollections] = useState([]);
  const [loading, setLoading] = useState(true);

  const toggleMobileFilter = () => {
    setIsMobileFilterOpen(!isMobileFilterOpen);
    // Prevent body scrolling when filter is open
    if (!isMobileFilterOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
  };
  
  // Expose the toggleMobileFilter method through ref
  useImperativeHandle(ref, () => ({
    toggleMobileFilter
  }));

  const fetchCollections = async () => {
    try {
      const response = await fetch("http://192.168.43.146:8001/shopify/collections");
      const data = await response.json();
      return data.collections || []; // Extract the collections array from the response
    } catch (error) {
      console.error("Error fetching categories:", error);
      return [];
    }
  };

  useEffect(() => {
    setLoading(true);
    fetchCollections()
      .then((data) => {
        console.log("Fetched collections raw data:", data);
        setCollections(data);
        setLoading(false);
      })
      .catch(error => {
        console.error("Error in collections fetch:", error);
        setLoading(false);
      });
  }, []);

  // Clean up body overflow style when component unmounts
  useEffect(() => {
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, []);

  // Common filter options that will be used in both desktop and mobile
  const filterOptions = (
    <>
      <div className="filter-options">
        <details className="sidebar__filter-group">
          <summary>
            CATEGORY
          </summary>
          <div className="filter-group__options">
            {loading ? (
              <div className="filter-option">
                <div className="spinner-circle" style={{ width: '20px', height: '20px', margin: '8px auto' }}></div>
                <div style={{ textAlign: 'center', fontSize: '14px' }}>Loading categories...</div>
              </div>
            ) : collections && collections.length > 0 ? 
              collections.map((collection) => (
                <div className="filter-option" key={collection.id}>
                  <input type="checkbox" id={`cat-${collection.id}`} className="filter-option__checkbox" />
                  <label htmlFor={`cat-${collection.id}`} className="filter-option__label">{collection.title}</label>
                  <span className="filter-option__count">(10)</span>
                </div>
              )) : 
              <div className="filter-option">No categories found</div>
            }
          </div>
        </details>
        <details className="sidebar__filter-group">
          <summary>PRICE RANGE</summary>
          {/* ...price options... */}
        </details>
        <details className="sidebar__filter-group">
          <summary>COLOR</summary>
          {/* ...color options... */}
        </details>
        <details className="sidebar__filter-group">
          <summary>BRANDS</summary>
          {/* ...brand options... */}
        </details>
        <details className="sidebar__filter-group">
          <summary>FAST SHIPPING</summary>
          {/* ...shipping options... */}
        </details>
      </div>
      <button className="sidebar__clear">CLEAR FILTERS</button>
    </>
  );

  return (
    <>
      {/* Desktop Filter Sidebar */}
      <aside className="filter-sidebar desktop-filter">
        <div className="sidebar__filter-header">
          <h4>FILTERS</h4>
          <img 
            src={require("../assets/images/filter-icon.png")} 
            alt="Filter Icon"
            className="desktop-filter-icon"
          />
        </div>
        {filterOptions}
      </aside>
      
      {/* Mobile Filter Button - shown only in desktop layout */}
      <div className="mobile-filter-button-container original-filter-button">
        <button className="mobile-filter-button" onClick={toggleMobileFilter}>
          <span>FILTERS</span>
          <img src={require("../assets/images/filter-icon.png")} alt="Filter" />
         
        </button>
      </div>
      
      {/* Mobile Filter Overlay */}
      <div className={`mobile-filter-overlay ${isMobileFilterOpen ? 'open' : ''}`} onClick={toggleMobileFilter}></div>
      
      {/* Mobile Filter Sidebar */}
      <aside className={`filter-sidebar mobile-filter ${isMobileFilterOpen ? 'open' : ''}`}>
        <div className="sidebar__filter-header">
          <h4>FILTERS</h4>
          <button 
            className="mobile-filter-close" 
            onClick={toggleMobileFilter}
            aria-label="Close filter menu"
          >
            ✕
          </button>
        </div>
        {filterOptions}
      </aside>
    </>
  );
});

export default FilterSidebar;