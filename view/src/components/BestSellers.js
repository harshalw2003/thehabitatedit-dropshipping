// BestSellers.js
import React from "react";
import { Link } from "react-router-dom";
import "../assets/css/BestSellers.css";
import ProductGrid from "./ProductGrid";

const BestSellers = () => (
  <section className="bestsellers-section">
    <div className="bestsellers-container">
      <div className="bestseller-header">
        <h2>BESTSELLERS</h2>
        <div className="browse-all-container desktop">
          <Link to="/products" className="browse-all-button">
            MORE PRODUCTS
                      <span className="material-symbols-outlined ">arrow_right_alt</span>

          </Link>
        </div>
      </div>
      <div className="bestsellers-grid">
        <ProductGrid limit={4} sort="popularity" />
      </div>
      <div className="browse-all-container mobile">
        <Link to="/products" className="browse-all-button">
          MORE PRODUCTS
          <span className="material-symbols-outlined">arrow_right_alt</span>
        </Link>
      </div>
    </div>
  </section>
);

export default BestSellers;
