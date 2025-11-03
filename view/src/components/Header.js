import React, { useState, useEffect, useRef } from "react";
import "../assets/css/Header.css";
import LoginPopup from "./LoginPopup";
import { Link, useLocation, useNavigate } from "react-router-dom";
import ip from '../ip.js';

const Header = () => {
  const [isLoginPopupOpen, setIsLoginPopupOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userData, setUserData] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [showResults, setShowResults] = useState(false);
  const [isSearching, setIsSearching] = useState(false);
  const searchRef = useRef(null);

  // Handle click outside search results
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        setShowResults(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  // Get current route for active tab
  const location = useLocation();
  const navigate = useNavigate();

  const handleUserIconClick = () => {
    if (!isLoggedIn) {
      setIsLoginPopupOpen(true);
    } else {
      navigate('/profile');
    }
  };

  const closeLoginPopup = () => {
    setIsLoginPopupOpen(false);
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const handleSearch = async (searchValue) => {
    setSearchTerm(searchValue);
    
    if (searchValue.trim() === "") {
      setSearchResults([]);
      setShowResults(false);
      return;
    }

    setIsSearching(true);
    try {
      // Backend mounts shopify routes under /shopify
      const response = await fetch(`http://${ip}:8001/shopify/products?search=${encodeURIComponent(searchValue)}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        }
      });

      if (response.ok) {
        const data = await response.json();

        // Backend returns the Shopify response object (it may be nested as data.data.products)
        const productsEdges = (data && data.data && data.data.products && data.data.products.edges)
          || (data && data.products && data.products.edges)
          || [];

        // Print raw products to console for debugging as requested
        console.log('Search response productsEdges:', productsEdges);

        // Filter and map to a simple shape (include image for UI)
        const filteredProducts = productsEdges
          .filter(({ node }) => node && node.title && node.title.toLowerCase().includes(searchValue.toLowerCase()))
          .map(({ node }) => ({ 
            id: node.id, 
            title: node.title, 
            handle: node.handle,
            image: node.images && node.images.edges && node.images.edges[0] && node.images.edges[0].node && node.images.edges[0].node.url
              ? node.images.edges[0].node.url
              : null
          }));

  console.log('Filtered products for UI:', filteredProducts);
  setSearchResults(filteredProducts);
        // Show results even if empty so we can display "No products found"
        setShowResults(true);
      }
    } catch (error) {
      console.error('Error searching products:', error);
      setSearchResults([]);
    } finally {
      setIsSearching(false);
    }
  };

  const handleProductClick = (handle) => {
    setShowResults(false);
    setSearchTerm("");
    // Navigate to product details page
    navigate(`/product/${handle}`);
  };
  
  // Function to fetch user data from the backend
  const fetchUserData = async () => {
    console.log('fetching user details')
    try {
      const token = localStorage.getItem('authToken');
      if (!token) return;
      
      const response = await fetch(`http://${ip}:8001/user/authenticate`, {
        method: 'GET',
        headers: { 
          'Authorization' : `Bearer ${token}`,
          'credentials': 'include' // Include credentials for CORS requests
        }
      });
      
      if (response.ok) {
        const userData = await response.json();
        console.log("Fetched user data:", userData.user);
        setUserData(userData.user);
      } else {
        // If the request fails (e.g., token expired), log the user out
        handleLogout();
      }
    } catch (error) {
      console.error('Error fetching user data:', error);
    }
  };

  // Check for logged-in user on component mount
  useEffect(() => {
    const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
    if (isLoggedIn) {
      setIsLoggedIn(true);
      fetchUserData(); // Fetch user details from backend
    }
  }, []);
  
  // Handle successful login
  const handleLoginSuccess = (loginSuccess) => {
    if (loginSuccess) {
      setIsLoggedIn(true);
      fetchUserData(); // Fetch user details after login
    }
  };
  
  // Handle actual logout
  const handleLogout = async () => {
    try {
      const response = await fetch(`http://${ip}:8001/user/logout`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('authToken')}`
        }
      });
      const data = await response.json();

      if (data.success) {
        localStorage.removeItem('isLoggedIn');
        localStorage.removeItem('authToken');
        setIsLoggedIn(false);
        setUserData(null);
      }
    } catch(error) {
      console.error('Error logging out:', error);
    }
  };

  return (
    <>
      {/* Desktop Header */}
      <header className="header">
        <div className="header__topbar"> :) WELCOME TO THE HABITAT EDIT*</div>
        <div className="header__main">
          <Link to="/" className="header__logo">T H E</Link>
          <nav className="header__nav">
            <Link to="/" className={location.pathname === "/" ? "active" : ""}>
              HOME
            </Link>
            <Link to="/products" className={location.pathname.startsWith("/products") ? "active" : ""}>
              PRODUCTS
            </Link>
            <Link to="/about" className={location.pathname.startsWith("/about") ? "active" : ""}>
              ABOUT
            </Link>
            {/* <Link to="/contact" className={location.pathname.startsWith("/contact") ? "active" : ""}>CONTACT</Link> */}
          </nav>
          <div className="header__actions">
            {/* Search Bar */}
            <div className="header-search-bar" ref={searchRef}>
              <div className="header-search-bar-inner">
                <input
                  type="text"
                  className="header-search-input"
                  placeholder="Search products..."
                  value={searchTerm}
                  onChange={(e) => handleSearch(e.target.value)}
                  onFocus={() => {
                    if (searchTerm.trim() !== "" && searchResults.length > 0) setShowResults(true);
                  }}
                />
                <button type="button" className="header-search-btn">
                  <span className="material-symbols-outlined">search</span>
                </button>
              </div>
                {showResults && (searchResults.length > 0 || isSearching) && (
                  <>
                    {/* Backdrop to capture clicks outside and allow dropdown to overlay page */}
                    <div className="search-results-backdrop" onClick={() => setShowResults(false)} />
                    <div className="search-results-dropdown">
                      {isSearching ? (
                        <div className="search-result-item">Searching...</div>
                      ) : searchResults.length > 0 ? (
                        searchResults.map((product) => (
                          <div
                            key={product.id}
                            className="search-result-item"
                            onClick={() => handleProductClick(product.handle)}
                          >
                            <div className="search-result-image-wrapper">
                              {product.image ? (
                                <img src={product.image} alt={product.title} className="search-result-image" />
                              ) : (
                                <div className="search-result-image placeholder" />
                              )}
                            </div>
                            <div className="search-result-text">{product.title}</div>
                          </div>
                        ))
                      ) : (
                        <div className="search-result-item">No products found</div>
                      )}
                    </div>
                  </>
                )}
            </div>
            <div className="user-dropdown">
              <div className="user-icon-wrapper" onClick={handleUserIconClick} style={{cursor: 'pointer'}}>
                <img src={require("../assets/images/user-icon.png")} alt="User" className="user-icon" />
              </div>
            </div>
            <Link to="/cart" className="bag-link">
              <img src={require("../assets/images/shopping-cart.png")} alt="Cart" className="cart-icon" />
              <span className="cart-count">(03)</span>
            </Link>
          </div>
        </div>
      </header>

      {/* Mobile Header */}
      <header className="mobile-header">
        <div className="header__topbar"> :) WELCOME TO THE HABITAT EDIT*</div>

        <div className="mobile_header__main">
          <div className="mobile-menu-actions">
              <span className="material-symbols-outlined">search</span>
            <div className="mobile-user-wrapper">
            
              <div className="mobile-user-icon-wrapper" onClick={handleUserIconClick} style={{cursor: 'pointer'}}>
                <img src={require("../assets/images/user-icon.png")} alt="User" className="mobile-user-icon" />
              </div>
            </div>
            <Link to="/cart" className="mobile-action-link">
              <img src={require("../assets/images/shopping-cart.png")} alt="Cart" />
              <span className="cart-count">(03)</span>
            </Link>
          </div>
        <Link to="/" className="mobile-header__logo">T H E</Link>
          <input className="toggle-checkbox mobile-header__menu-btn" onClick={toggleMobileMenu} id="toggle" type="checkbox" />
          <label className="hamburger" htmlFor="toggle">
            <div className="bar"></div>
            <div className="bar"></div>
            <div className="bar"></div>
          </label>
        </div>
      </header>

      {/* Mobile Menu Slide-in */}
      <div
        className={`mobile-menu-container ${isMobileMenuOpen ? "open" : ""}`}
      >
        <div className="mobile-menu-overlay" onClick={toggleMobileMenu}></div>
        <div className="mobile-menu-content">
          <div className="mobile-menu-header">
            <div className="mobile-header__logo">T H E</div>
            <button className="close-menu-btn" onClick={toggleMobileMenu}>
              ×
            </button>
          </div>
          {/* Search bar removed from mobile menu */}
          
          <nav className="mobile-menu-nav">
            <Link to="/" className="mobile-nav-link" onClick={toggleMobileMenu}>
              HOME
            </Link>
            <Link to="/products" className="mobile-nav-link" onClick={toggleMobileMenu}>
              PRODUCTS
            </Link>
            <Link to="/about" className="mobile-nav-link" onClick={toggleMobileMenu}>
              ABOUT US
            </Link>
            <Link to="/contact" className="mobile-nav-link" onClick={toggleMobileMenu}>
              CONTACT
            </Link>
          </nav>
          
        </div>
      </div>

      {/* Login Popup */}
      <LoginPopup isOpen={isLoginPopupOpen} onClose={closeLoginPopup} onLoginSuccess={handleLoginSuccess} />
    </>
  );
};

export default Header;
