import React, { useState, useEffect, useRef } from "react";
import "../assets/css/FilterDropdown.css";

export default function FilterDropdown() {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [selectedFilters, setSelectedFilters] = useState({
    categories: [],
    priceRange: '',
    colors: [],
    brands: [],
    fastShipping: false,
  });
  const dropdownRef = useRef(null);
  
  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };
  
  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
    }
    
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [dropdownRef]);
  
  // Handle category checkbox changes
  const handleCategoryChange = (category) => {
    const updatedCategories = [...selectedFilters.categories];
    
    if (updatedCategories.includes(category)) {
      // Remove if already selected
      const index = updatedCategories.indexOf(category);
      updatedCategories.splice(index, 1);
    } else {
      // Add if not selected
      updatedCategories.push(category);
    }
    
    setSelectedFilters({
      ...selectedFilters,
      categories: updatedCategories
    });
  };
  
  // Handle price range selection
  const handlePriceRangeChange = (range) => {
    setSelectedFilters({
      ...selectedFilters,
      priceRange: range
    });
  };
  
  // Handle color selection
  const handleColorChange = (color) => {
    const updatedColors = [...selectedFilters.colors];
    
    if (updatedColors.includes(color)) {
      const index = updatedColors.indexOf(color);
      updatedColors.splice(index, 1);
    } else {
      updatedColors.push(color);
    }
    
    setSelectedFilters({
      ...selectedFilters,
      colors: updatedColors
    });
  };
  
  // Clear all filters
  const clearAllFilters = () => {
    setSelectedFilters({
      categories: [],
      priceRange: '',
      colors: [],
      brands: [],
      fastShipping: false,
    });
  };
  
  return (
    <div className="filter-dropdown" ref={dropdownRef}>
      <div className="filter-dropdown__container" onClick={toggleDropdown}>
        <span className="filter-dropdown__label">FILTERS</span>
        <img 
          src={require("../assets/images/filter-icon.png")} 
          alt="Filter" 
          className="filter-dropdown__icon" 
        />
        {/* <span className={`filter-dropdown__arrow ${isDropdownOpen ? 'rotated' : ''}`}>▼</span> */}
      </div>
      
      {isDropdownOpen && (
        <div className="filter-dropdown__content">
          {/* Categories Section */}
          {/* <div className="filter-dropdown__section">
            <h4 className="filter-dropdown__heading">CATEGORY</h4>
            <div className="filter-dropdown__options">
              {["TECH & GADGETS", "SELF CARE", "HOME DECOR", "AUTO CARE"].map(category => (
                <div className="filter-dropdown__option" key={category}>
                  <input 
                    type="checkbox" 
                    id={`filter-cat-${category}`} 
                    checked={selectedFilters.categories.includes(category)}
                    onChange={() => handleCategoryChange(category)}
                    className="filter-option__checkbox" 
                  />
                  <label htmlFor={`filter-cat-${category}`} className="filter-option__label">
                    {category}
                  </label>
                </div>
              ))}
            </div>
          </div> */}
          
          {/* Price Range Section */}
          <div className="filter-dropdown__section">
            <h4 className="filter-dropdown__heading">PRICE RANGE</h4>
            <div className="filter-dropdown__options">
              {["Under £50", "£50 - £100", "£100 - £200", "Over £200"].map(range => (
                <div className="filter-dropdown__option" key={range}>
                  <input 
                    type="radio" 
                    id={`filter-price-${range}`} 
                    name="price-range"
                    checked={selectedFilters.priceRange === range}
                    onChange={() => handlePriceRangeChange(range)}
                    className="filter-option__radio" 
                  />
                  <label htmlFor={`filter-price-${range}`} className="filter-option__label">
                    {range}
                  </label>
                </div>
              ))}
            </div>
          </div>
          
          {/* Colors Section */}
          <div className="filter-dropdown__section">
            <h4 className="filter-dropdown__heading">COLOR</h4>
            <div className="filter-dropdown__color-options">
              {[
                { name: "Black", color: "#000000" },
                { name: "White", color: "#ffffff" },
                { name: "Gray", color: "#808080" },
                { name: "Blue", color: "#0000ff" },
                { name: "Red", color: "#ff0000" }
              ].map(colorObj => (
                <div 
                  className={`color-swatch ${selectedFilters.colors.includes(colorObj.name) ? 'selected' : ''}`}
                  key={colorObj.name}
                  onClick={() => handleColorChange(colorObj.name)}
                  style={{ backgroundColor: colorObj.color }}
                  title={colorObj.name}
                ></div>
              ))}
            </div>
          </div>
          
          {/* Fast Shipping Option */}
          <div className="filter-dropdown__section">
            <div className="filter-dropdown__option">
              <input 
                type="checkbox" 
                id="filter-fast-shipping" 
                checked={selectedFilters.fastShipping}
                onChange={() => setSelectedFilters({
                  ...selectedFilters,
                  fastShipping: !selectedFilters.fastShipping
                })}
                className="filter-option__checkbox" 
              />
              <label htmlFor="filter-fast-shipping" className="filter-option__label">
                FAST SHIPPING
              </label>
            </div>
          </div>
          
          <div className="filter-dropdown__actions">
            <button className="filter-dropdown__clear" onClick={clearAllFilters}>
              Clear All
            </button>
            <button className="filter-dropdown__apply" onClick={() => setIsDropdownOpen(false)}>
              Apply Filters
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
