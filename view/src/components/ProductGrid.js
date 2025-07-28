import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "../assets/css/ProductGrid.css";
import "../assets/css/LoadingAnimations.css"; // Import loading animations
import { fetchProducts, createCart } from "../api/shopify";


export default function ProductGrid({ category = null, limit = null, sort = null }) {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [fadeIn, setFadeIn] = useState(false); // State for controlling fade-in animation
  const [wishlist, setWishlist] = useState([]); // State to track wishlist items

  useEffect(() => {
    setLoading(true);
    
    // Build query parameters
    let queryParams = '';
    if (category && category !== 'All products') {
      queryParams += `?category=${encodeURIComponent(category)}`;
    }
    
    if (sort) {
      queryParams += queryParams ? `&sort=${sort}` : `?sort=${sort}`;
    }
    
    // Fetch products with optional filters
    fetchProducts(queryParams)
      .then(data => {
        // Apply limit if provided
        let filteredData = data;
        if (limit && limit > 0 && data.length > limit) {
          filteredData = data.slice(0, limit);
        }
        
        setProducts(filteredData);
        setLoading(false);
        // Set a small delay before triggering fade in animation
        setTimeout(() => setFadeIn(true), 100);
      })
      .catch(error => {
        console.error("Error fetching products:", error);
        setLoading(false);
      });
  }, [category, limit, sort]);
  
  // Load wishlist from localStorage on component mount
  useEffect(() => {
    try {
      const savedWishlist = localStorage.getItem('wishlist');
      if (savedWishlist) {
        setWishlist(JSON.parse(savedWishlist));
      }
    } catch (error) {
      console.error("Error loading wishlist from localStorage:", error);
    }
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
  
  // Function to toggle wishlist items
  const toggleWishlist = (productId) => {
    setWishlist(prevWishlist => {
      let newWishlist;
      
      // Check if product is already in wishlist
      if (prevWishlist.includes(productId)) {
        // Remove from wishlist
        console.log("Removed from wishlist:", productId);
        newWishlist = prevWishlist.filter(id => id !== productId);
      } else {
        // Add to wishlist
        console.log("Added to wishlist:", productId);
        newWishlist = [...prevWishlist, productId];
      }
      
      // Save updated wishlist to localStorage
      try {
        localStorage.setItem('wishlist', JSON.stringify(newWishlist));
      } catch (error) {
        console.error("Error saving wishlist to localStorage:", error);
      }
      
      return newWishlist;
    });
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
        <div className="product-grid__link-container" key={`product-${cleanProductId(product.node.id)}`}>
          <Link to={`/product/${cleanProductId(product.node.id)}`} className="product-grid__link">
            <div className="product-grid__item" style={{animationDelay: `${index * 0.05}s`}}>
              <div className="product-grid__img">
                <img
                  src={product.node.images.edges[0]?.node.url}
                  alt={product.node.images.edges[0]?.node.altText || product.node.title}
                  loading="lazy"
                />
                <div className="product-grid__actions">
                  <button 
                    className="product-grid__action-btn cart-btn"
                    onClick={(e) => {
                      e.preventDefault();
                      e.stopPropagation();
                      cartHandler(product.node.variants.edges[0].node.id);
                    }}
                    title="Add to Cart"
                  >
                    <img src={require("../assets/images/add-to-cart-icon.png")} alt="Add to Cart" />
                  </button>
                  <button 
                    className={`product-grid__action-btn wishlist-btn ${wishlist.includes(cleanProductId(product.node.id)) ? 'active' : ''}`}
                    onClick={(e) => {
                      e.preventDefault();
                      e.stopPropagation();
                      toggleWishlist(cleanProductId(product.node.id));
                    }}
                    title={wishlist.includes(cleanProductId(product.node.id)) ? "Remove from Wishlist" : "Add to Wishlist"}
                    style={{ 
                      background: 'none', 
                      border: 'none',
                      boxShadow: 'none',
                      backgroundColor: 'transparent'
                    }}
                  >
                    {wishlist.includes(cleanProductId(product.node.id)) ? (
                      <img src={require("../assets/images/wishlist-filled-icon.png")} alt="Remove from Wishlist" />
                    ) : (
                      <img src={require("../assets/images/wishlist-unfilled-icon.png")} alt="Add to Wishlist" />
                    )}
                  </button>
                </div>
              </div>
              <h3 className="product-grid__cat">{product.node.collections.edges[0].node.title}</h3>

              <div className="product-grid__name_price">
                <div className="product-grid__name">{trimProductTitle(product.node.title)}</div>
                <div className="product-grid__price">
                  ₹{product.node.variants.edges[0].node.price.amount}
                </div>
                <span className="material-symbols-outlined product-grid__arrow">
                  arrow_outward
                </span>
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
        </div>
      ))}
       
      </div>
    )}
  </section>
);

}
