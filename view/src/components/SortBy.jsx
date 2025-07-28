import React, { useState, useEffect, useRef } from "react";
import "../assets/css/SortBy.css";

export default function SortBy() {
  const [selectedOption, setSelectedOption] = useState("");
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  const handleOptionChange = (e) => {
    setSelectedOption(e.target.value);
  };

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };
  
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

  return (
    <div className="sort-by" ref={dropdownRef}>
      <div className="sort-by__container" onClick={toggleDropdown}>
        <span className="sort-by__label desktop"> SORT BY <img  src={require("../assets/images/sort-icon.png")}  alt="" /></span>
        <span className="sort-by__label mobile"><img  src={require("../assets/images/sort-icon.png")}  alt="" /></span>
        {/* <span className={`sort-by__arrow ${isDropdownOpen ? 'rotated' : ''}`}>▼</span> */}
      </div>
      
      {isDropdownOpen && (
        <div className="sort-by__dropdown">
          {/* <div 
            className={`sort-by__option ${selectedOption === "Featured" ? "selected" : ""}`}
            onClick={() => {
              setSelectedOption("Featured");
              setIsDropdownOpen(false);
            }}
          >
            Featured
          </div> */}
          <div 
            className={`sort-by__option ${selectedOption === "Price: Low to High" ? "selected" : ""}`}
            onClick={() => {
              setSelectedOption("Price: Low to High");
              setIsDropdownOpen(false);
            }}
          >
            Price: Low to High
          </div>
          <div 
            className={`sort-by__option ${selectedOption === "Price: High to Low" ? "selected" : ""}`}
            onClick={() => {
              setSelectedOption("Price: High to Low");
              setIsDropdownOpen(false);
            }}
          >
            Price: High to Low
          </div>
          <div 
            className={`sort-by__option ${selectedOption === "Newest" ? "selected" : ""}`}
            onClick={() => {
              setSelectedOption("Newest");
              setIsDropdownOpen(false);
            }}
          >
            Newest
          </div>
        </div>
      )}
    </div>
  );
}