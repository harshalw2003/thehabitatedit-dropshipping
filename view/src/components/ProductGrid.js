import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "../assets/css/ProductGrid.css";
import "../assets/css/LoadingAnimations.css"; // Import loading animations
import { fetchProducts, createCart } from "../api/shopify";


export default function ProductGrid() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [fadeIn, setFadeIn] = useState(false); // State for controlling fade-in animation

  useEffect(() => {
    setLoading(true);
    fetchProducts()
      .then(data => {
        setProducts(data);
        setLoading(false);
        // Set a small delay before triggering fade in animation
        setTimeout(() => setFadeIn(true), 100);
      })
      .catch(error => {
        console.error("Error fetching products:", error);
        setLoading(false);
      });
  }, []);

  function trimProductTitle(title, maxWords = 5, maxChars = 50) {
  const words = title.split(" ");

  // If it's already short, return as-is
  if (title.length <= maxChars && words.length <= maxWords) return title;

  // Remove filler/low-value words (optional enhancement)
  const skipWords = ["with", "for", "and", "the", "of"];
  const filtered = words.filter(word => !skipWords.includes(word.toLowerCase()));

  // Pick first few important words
  const trimmed = filtered.slice(0, maxWords).join(" ");

  return trimmed.length > maxChars
    ? trimmed.slice(0, maxChars).trim()
    : trimmed;

}

  const productsArray = products?.data?.products?.edges || [];
  console.log("Products array", productsArray)
  const cartHandler = (id) => {
    createCart(id).then((checkoutUrl) => {
      window.location.href = checkoutUrl;
    });
  };

  const cleanProductId = (id) => {
    const productId = id.split("/").pop(); // "9559713710320"
// navigate(`/product/${productId}`);
console.log("Cleaned Product ID:", productId);
    return productId
  }
  return (
  <section className="product-grid">
    {/* <div className="product-grid__title">
      <h1>Products</h1>
    </div> */}
    
    {loading ? (
      <div className="product-grid__loading">
        <div className="loading-spinner">
          <div className="spinner-circle"></div>
          <div className="spinner-text">Loading products...</div>
        </div>
        
        {/* Skeleton loading placeholders */}
        <div className="product-grid__list">
          {[...Array(6)].map((_, index) => (
            <div key={index} className="product-grid__link">
              <div className="product-grid__item">
                <div className="product-grid__img shimmer"></div>
                <div className="product-placeholder-text shimmer" style={{marginTop: "12px"}}></div>
                <div className="product-placeholder-text shimmer" style={{width: "60%"}}></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    ) : productsArray.length === 0 ? (
      <div className="product-grid__empty">
        <p>No products found.</p>
      </div>
    ) : (
      <div className={`product-grid__list ${fadeIn ? "fade-in" : ""}`}>
        {productsArray.map((product, index) => (
        <Link to={`/product/${cleanProductId(product.node.id)}`} className="product-grid__link" key={`product-${cleanProductId(product.node.id)}`}>
          <div className="product-grid__item" style={{animationDelay: `${index * 0.05}s`}}>
            <div className="product-grid__img">
              <img
                src={product.node.images.edges[0]?.node.url}
                alt={product.node.images.edges[0]?.node.altText || product.node.title}
                loading="lazy"
              />
            </div>
            <h3 className="product-grid__cat">{product.node.collections.edges[0].node.title}</h3>

            <div className="product-grid__name_price">
              <div className="product-grid__name">{trimProductTitle(product.node.title)}</div>
              <div className="product-grid__price">
                ₹{product.node.variants.edges[0].node.price.amount}
              </div>
            </div>
            {/* <button
              className="product-grid__buyNowBtn"
              onClick={(e) => {
                e.preventDefault();
                cartHandler(product.node.variants.edges[0].node.id);
              }}
            >
              ADD TO CART
            </button> */}
          </div>
        </Link>
      ))}
      </div>
    )}
  </section>
);

}
