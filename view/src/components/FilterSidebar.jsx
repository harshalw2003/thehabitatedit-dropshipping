import React, { useEffect, useState, forwardRef, useImperativeHandle } from "react";
import "../assets/css/FilterSidebar.css";
import "../assets/css/FilterOptions.css";
import "../assets/css/LoadingAnimations.css"; // Import loading animations
import ip from '../ip.js';

const FilterSidebar = forwardRef((props, ref) => {
  const [isMobileFilterOpen, setIsMobileFilterOpen] = useState(false);
  const [collections, setCollections] = useState([]);
  const [loading, setLoading] = useState(true);

  const toggleMobileFilter = () => {
    const newState = !isMobileFilterOpen;
    setIsMobileFilterOpen(newState);
    
    // Prevent body scrolling when filter is open
    if (newState) {
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
      const response = await fetch(`http://${ip}:8001/shopify/collections`);
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

  // Update overlay visibility when filter state changes
  useEffect(() => {
    const overlay = document.querySelector('.mobile-filter-overlay');
    if (overlay) {
      if (isMobileFilterOpen) {
        overlay.style.display = 'block';
        // Allow a tiny delay for the display to take effect before adding the open class for animation
        setTimeout(() => {
          overlay.classList.add('open');
        }, 10);
      } else {
        overlay.classList.remove('open');
        // Delay hiding the overlay until after animation completes
        setTimeout(() => {
          if (!isMobileFilterOpen) {
            overlay.style.display = 'none';
          }
        }, 300); // Match transition duration
      }
    }
  }, [isMobileFilterOpen]);

  // State for sort option
  const [selectedSortOption, setSelectedSortOption] = useState("");

  const handleSortOptionChange = (option) => {
    setSelectedSortOption(option);
    // Here you would implement actual sorting logic
    console.log("Sorting by:", option);
  };

  // Common filter options that will be used in both desktop and mobile
  const filterOptions = (
    <>
      <div className="filter-options">
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

  // Mobile-only filter options with sort options included
  const mobileFilterOptions = (
    <>
      <div className="filter-options">
        {/* Sort options - Mobile only */}
        <details className="sidebar__filter-group mobile-sort-options">
          <summary>SORT BY</summary>
          <div className="filter-group__options sort-options">
            <div 
              className={`sort-option ${selectedSortOption === "Price: Low to High" ? "selected" : ""}`}
              onClick={() => handleSortOptionChange("Price: Low to High")}
            >
              Price: Low to High
            </div>
            <div 
              className={`sort-option ${selectedSortOption === "Price: High to Low" ? "selected" : ""}`}
              onClick={() => handleSortOptionChange("Price: High to Low")}
            >
              Price: High to Low
            </div>
            <div 
              className={`sort-option ${selectedSortOption === "Newest" ? "selected" : ""}`}
              onClick={() => handleSortOptionChange("Newest")}
            >
              Newest
            </div>
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
      
      {/* Mobile Filter Overlay */}
      <div 
        className={`mobile-filter-overlay ${isMobileFilterOpen ? 'open' : ''}`}
        onClick={toggleMobileFilter}
      ></div>
      
      {/* Mobile Filter Sidebar */}
      <aside className={`filter-sidebar mobile-filter ${isMobileFilterOpen ? 'open' : ''}`}>
        <div className="sidebar__filter-header">
          <h4>FILTERS & SORT</h4>
          <button 
            className="mobile-filter-close" 
            onClick={toggleMobileFilter}
            aria-label="Close filter menu"
          >
            ✕
          </button>
        </div>
        {mobileFilterOptions}
      </aside>
    </>
  );
});

export default FilterSidebar;