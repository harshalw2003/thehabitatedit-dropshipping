import React from "react";
import { useEffect, useState } from "react";
import "../assets/css/FilterSidebar.css";
import "../assets/css/FilterOptions.css";
import "../assets/css/LoadingAnimations.css"; // Import loading animations

export default function FilterSidebar() {

const fetchCollections = async () => {
  try {
    const response = await fetch("http://localhost:8001/shopify/collections");
    const data = await response.json();
    return data.collections || []; // Extract the collections array from the response
  } catch (error) {
    console.error("Error fetching categories:", error);
    return [];
  }
};
const [collections, setCollections] = useState([]);
const [loading, setLoading] = useState(true);

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

  return (
    <aside className="filter-sidebar">
      <div className="sidebar__filter-header">
        <h4>FILTERS</h4>
        <img src={require("../assets/images/filter-icon.png")} />
      </div>
      <div className="filter-options">
        <details className="sidebar__filter-group">
  <summary>
    CATEGORY
    {/* <img src={require("../assets/images/dropdown.png")} alt="dropdown" /> */}
  </summary>
  <div className="filter-group__options">
    {loading ? ( // Show loading animation
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
    {/* <div className="filter-option">
      <input type="checkbox" id="cat2" className="filter-option__checkbox" />
      <label htmlFor="cat2" className="filter-option__label">Self Care</label>
      <span className="filter-option__count">(8)</span>
    </div>
    <div className="filter-option">
      <input type="checkbox" id="cat3" className="filter-option__checkbox" />
      <label htmlFor="cat3" className="filter-option__label">Home Decor</label>
      <span className="filter-option__count">(15)</span>
    </div> */}
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
    </aside>
  );
}