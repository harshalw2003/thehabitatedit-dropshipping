import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "../assets/css/ProductGrid.css";
import "../assets/css/LoadingAnimations.css"; // Import loading animations
import { fetchProducts, addToWishlist, removeFromWishlist, addToCart } from "../api/shopify";
import CartNotification from "./CartNotification";
import LoginPopup from "./LoginPopup";
import ip from '../ip.js';


export default function ProductGrid({ category = null, limit = null, sort = null, onLoadMore }) {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [fadeIn, setFadeIn] = useState(false); // State for controlling fade-in animation
  const [wishlist, setWishlist] = useState([]); // State to track wishlist items
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [isLoadingMore, setIsLoadingMore] = useState(false);
  const [allProducts, setAllProducts] = useState([]); // Store all fetched products
  const productsPerPage = 8; // Show 2 rows initially (4 products per row)
  const [notification, setNotification] = useState({
    visible: false,
    message: '',
    product: null
  });
  const [showLoginPopup, setShowLoginPopup] = useState(false);

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
        console.log("Fetched products:", data);
        
        // Extract products array from the API response
        const productsData = data?.data?.products?.edges || [];
        console.log("Processed products array:", productsData);
        
        // Store all products in state
        setAllProducts(productsData);
        
        if (limit && limit > 0) {
          console.log("Applying limit:", limit);
          setProducts(productsData.slice(0, limit));
          setHasMore(false);
        } else {
          // Show only first page of products initially
          setProducts(productsData.slice(0, productsPerPage));
          setHasMore(productsData.length > productsPerPage);
        }
        
        setLoading(false);
        // Set a small delay before triggering fade in animation
        setTimeout(() => setFadeIn(true), 100);
      })
      .catch(error => {
        console.error("Error fetching products:", error);
        setLoading(false);
      });
  }, [category, limit, sort, page]);
  
  // Load wishlist from backend when user is authenticated
  useEffect(() => {
    const fetchWishlist = async () => {
      const authToken = localStorage.getItem('authToken');
      if (authToken) {
        try {
          const response = await fetch(`http://${ip}:8001/user/get-wishlist`, {
            headers: {
              'Authorization': `Bearer ${authToken}`
            }
          });
          
          if (response.ok) {
            const data = await response.json();
            if (data.success && data.wishlist) {
              // Extract just the product handles from the wishlist items
              const wishlistHandles = data.wishlist.map(item => item.productHandle);
              setWishlist(wishlistHandles);
              // Still save to localStorage as a cache
              localStorage.setItem('wishlist', JSON.stringify(wishlistHandles));
            }
          }
        } catch (error) {
          console.error("Error fetching wishlist from server:", error);
          // Fall back to localStorage if server request fails
          try {
            const savedWishlist = localStorage.getItem('wishlist');
            if (savedWishlist) {
              setWishlist(JSON.parse(savedWishlist));
            }
          } catch (localError) {
            console.error("Error loading wishlist from localStorage:", localError);
          }
        }
      } else {
        // If not logged in, just use localStorage
        try {
          const savedWishlist = localStorage.getItem('wishlist');
          if (savedWishlist) {
            setWishlist(JSON.parse(savedWishlist));
          }
        } catch (error) {
          console.error("Error loading wishlist from localStorage:", error);
        }
      }
    };
    
    fetchWishlist();
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

  // No need to check if it's an array since we're handling that in the fetch
  const productsArray = products;
  console.log("Products array for rendering:", productsArray);

  const cleanProductId = (id) => {
    const productId = id.split("/").pop(); // "9559713710320"
    // navigate(`/product/${productId}`);
    console.log("Cleaned Product ID:", productId);
    return productId
  }
  
  const cleanVariantId = (id) => {
    return id.split("/").pop(); // Clean the variant ID
  }
  
  // Function to handle adding to cart
  const cartHandler = async (product) => {
    // Check if user is logged in
    const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
    if (!isLoggedIn) {
      // Show notification first
      setNotification({
        visible: true,
        message: 'Please login to add items to cart',
        product: null,
        type: 'login',
        onActionClick: () => {
          setShowLoginPopup(true);
          setNotification(prev => ({ ...prev, visible: false }));
        }
      });
      return;
    }

    try {
      console.log(product.handle)
      const productHandle = product.handle;
      const productId = cleanProductId(product.id);
      const variantId = cleanVariantId(product.variants.edges[0].node.id);
      console.log("Adding to cart:", productHandle, variantId);

      // Add to cart API call
      const result = await addToCart(productHandle, productId, variantId, 1);
      
      if (result.success) {
        // Item added successfully, show notification
        const productInfo = {
          title: product.title,
          image: product.images.edges[0]?.node.url,
          price: product.variants.edges[0].node.price.amount
        };
        
        // Show notification
        setNotification({
          visible: true,
          message: 'Product added to cart!',
          product: productInfo
        });
        
        // Hide any previous notification
        if (notification.visible) {
          setNotification(prev => ({ ...prev, visible: false }));
          setTimeout(() => {
            setNotification({
              visible: true,
              message: 'Product added to cart!',
              product: productInfo
            });
          }, 100);
        }
      } else if (result.status === 401) {
        // User is not authenticated, show login popup
        setShowLoginPopup(true);
      } else {
        // Other error
        console.error("Failed to add to cart:", result.message);
      }
    } catch (error) {
      console.error("Error adding item to cart:", error);
    }
  };
  
  // Function to close the notification
  const closeNotification = () => {
    setNotification(prev => ({ ...prev, visible: false }));
  };  // Function to toggle wishlist items
  const toggleWishlist = async (product) => {
    // Check if user is logged in
    const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
    if (!isLoggedIn) {
      // Show notification first
      setNotification({
        visible: true,
        message: 'Please login to add items to wishlist',
        product: null,
        type: 'login',
        onActionClick: () => {
          setShowLoginPopup(true);
          setNotification(prev => ({ ...prev, visible: false }));
        }
      });
      return;
    }

    const productHandle = product.handle;

    try {
      // Check if product is already in wishlist using current state
      const isInWishlist = wishlist.includes(productHandle);

      let success = false;
      
      // Make the API call
      if (isInWishlist) {
        // Remove from wishlist via API
        console.log("Removing from wishlist:", productHandle);
        success = await removeFromWishlist(productHandle);
        console.log("Removed from wishlist response:", success);
      } else {
        // Add to wishlist via API
        console.log("Adding to wishlist:", productHandle);
        success = await addToWishlist(productHandle);
        console.log("Added to wishlist response:", success);
      }
      
      if (success) {
        // Update local state
        setWishlist(prevWishlist => {
          let newWishlist;
          
          if (isInWishlist) {
            newWishlist = prevWishlist.filter(handle => handle !== productHandle);
          } else {
            newWishlist = [...prevWishlist, productHandle];
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
    } catch (error) {
      console.error("Error updating wishlist:", error);
    }
  }

  // Handle successful login
  const handleLoginSuccess = () => {
    setShowLoginPopup(false);
    // Optionally refresh the page or update authentication state
    window.location.reload();
  };
  return (
  <section className="product-grid">
    {/* Cart Notification */}
    <CartNotification 
      message={notification.message}
      isVisible={notification.visible}
      onClose={closeNotification}
      product={notification.product}
      type={notification.type}
      onActionClick={notification.onActionClick}
    />
    
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
          <div className="product-grid__link-container" key={`product-${product.node.handle}`}>
            <Link to={`/product/${product.node.handle}`} className="product-grid__link">
              <div className="product-grid__item" style={{animationDelay: `${index * 0.05}s`}}>
                <div className="product-grid__img">
                  <img
                    src={product.node.images.edges[0]?.node.url}
                    alt={product.node.images.edges[0]?.node.altText || product.node.title}
                    loading="lazy"
                  />
                  <div className="product-grid__actions">
                    <button 
                      className={`product-grid__action-btn wishlist-btn ${wishlist.includes(product.node.handle) ? 'active' : ''}`}
                      onClick={(e) => {
                        e.preventDefault();
                        e.stopPropagation();
                        toggleWishlist(product.node);
                      }}
                      title={wishlist.includes(product.node.handle) ? "Remove from Wishlist" : "Add to Wishlist"}
                      style={{ 
                        background: 'none', 
                        border: 'none',
                        boxShadow: 'none',
                        backgroundColor: 'transparent'
                      }}
                    >
                      {wishlist.includes(product.node.handle) ? (
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
    
    {/* Login Popup */}
    <LoginPopup 
      isOpen={showLoginPopup} 
      onClose={() => setShowLoginPopup(false)}
      onLoginSuccess={handleLoginSuccess}
    />
    {!limit && hasMore && (
      <div className="load-more-container">
        <button 
          className={`load-more-button ${isLoadingMore ? 'loading' : ''}`} 
          onClick={() => {
            setIsLoadingMore(true);
            const nextPage = page + 1;
            setPage(nextPage);
            
            // Load more products from the cached data
            setProducts(prev => {
              const start = (nextPage - 1) * productsPerPage;
              const end = nextPage * productsPerPage;
              const nextBatch = allProducts.slice(start, end);
              return [...prev, ...nextBatch];
            });

            // Show loading state briefly for smooth transition
            setTimeout(() => {
              setIsLoadingMore(false);
            }, 500);
          }}
        >
          {isLoadingMore ? 'Loading...' : 'Load More'}
        </button>
      </div>
    )}
  </section>
);

}
