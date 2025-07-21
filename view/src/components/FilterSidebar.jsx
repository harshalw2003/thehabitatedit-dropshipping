import React from "react";
import "../assets/css/FilterSidebar.css";
import "../assets/css/FilterOptions.css";

export default function FilterSidebar() {
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
    <div className="filter-option">
      <input type="checkbox" id="cat1" className="filter-option__checkbox" />
      <label htmlFor="cat1" className="filter-option__label">Kitchen Gear</label>
      <span className="filter-option__count">(12)</span>
    </div>
    <div className="filter-option">
      <input type="checkbox" id="cat2" className="filter-option__checkbox" />
      <label htmlFor="cat2" className="filter-option__label">Self Care</label>
      <span className="filter-option__count">(8)</span>
    </div>
    <div className="filter-option">
      <input type="checkbox" id="cat3" className="filter-option__checkbox" />
      <label htmlFor="cat3" className="filter-option__label">Home Decor</label>
      <span className="filter-option__count">(15)</span>
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
    </aside>
  );
}