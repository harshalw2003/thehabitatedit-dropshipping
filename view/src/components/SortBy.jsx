import React from "react";
import "../assets/css/SortBy.css";

export default function SortBy() {
  return (
    <div className="sort-by">
      <span className="sort-by__label">SORT BY</span>
      <select className="sort-by__select">
        <option>Featured</option>
        <option>Price: Low to High</option>
        <option>Price: High to Low</option>
        <option>Newest</option>
      </select>
    </div>
  );
}