import React, { useState } from "react";
import "../assets/css/SearchBar.css";

export default function SearchBar() {
  const [searchTerm, setSearchTerm] = useState("");

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
    // Here you would typically implement search functionality
    // For now, we'll just update the state
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Searching for:", searchTerm);
    // Implement actual search functionality here
  };

  const clearSearch = () => {
    setSearchTerm("");
  };

  return (
    <div className="search-bar">
      <form onSubmit={handleSubmit} className="search-bar__form">
        <input
          type="text"
          className="search-bar__input"
          placeholder="Search Products..."
          value={searchTerm}
          onChange={handleSearch}
          aria-label="Search products"
        />
        {searchTerm && (
          <button 
            type="button" 
            className="search-bar__clear" 
            onClick={clearSearch}
            aria-label="Clear search"
          >
            ✕
          </button>
        )}
        <button 
          type="submit" 
          className="search-bar__submit"
          aria-label="Search"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="11" cy="11" r="8"></circle>
            <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
          </svg>
        </button>
      </form>
    </div>
  );
}
