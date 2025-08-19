// Header.js
import React, { useState, useRef, useEffect } from "react";
import "../assets/css/Header.css";
import LoginPopup from "./LoginPopup";
import { Link } from "react-router-dom";
import ip from '../ip.js';

const Header = () => {
  const [isLoginPopupOpen, setIsLoginPopupOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isDesktopDropdownOpen, setIsDesktopDropdownOpen] = useState(false);
  const [isMobileDropdownOpen, setIsMobileDropdownOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userData, setUserData] = useState(null);
  const [showLogoutConfirm, setShowLogoutConfirm] = useState(false);
  
  const desktopDropdownRef = useRef(null);
  const mobileDropdownRef = useRef(null);

  const openLoginPopup = () => {
    setIsLoginPopupOpen(true);
    // Close dropdowns when opening login popup
    setIsDesktopDropdownOpen(false);
    setIsMobileDropdownOpen(false);
  };

  const closeLoginPopup = () => {
    setIsLoginPopupOpen(false);
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
    // Close dropdown when toggling mobile menu
    setIsMobileDropdownOpen(false);
  };
  
  const toggleDesktopDropdown = (e) => {
    e.preventDefault();
    setIsDesktopDropdownOpen(!isDesktopDropdownOpen);
  };
  
  const toggleMobileDropdown = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsMobileDropdownOpen(!isMobileDropdownOpen);
  };
  
  // Handle click outside to close dropdowns
  useEffect(() => {
    const handleClickOutside = (event) => {
      // For desktop dropdown
      if (desktopDropdownRef.current && !desktopDropdownRef.current.contains(event.target)) {
        setIsDesktopDropdownOpen(false);
      }
      
      // For mobile dropdown
      if (mobileDropdownRef.current && !mobileDropdownRef.current.contains(event.target)) {
        setIsMobileDropdownOpen(false);
      }
    };
    
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  // Effect for resetting dropdowns when scrolling
  useEffect(() => {
    const handleScroll = () => {
      // Close dropdowns on scroll
      setIsDesktopDropdownOpen(false);
      setIsMobileDropdownOpen(false);
    };
    
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);
  
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
  
  // Show logout confirmation
  const showLogoutConfirmation = (e) => {
    e.preventDefault();
    // Close dropdowns
    setIsDesktopDropdownOpen(false);
    setIsMobileDropdownOpen(false);
    // Show confirmation popup
    setShowLogoutConfirm(true);
  };
  
  // Cancel logout
  const cancelLogout = () => {
    setShowLogoutConfirm(false);
  };
  
  // Handle actual logout after confirmation
  const handleLogout = async () => {
    // Notify backend about logout
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
        console.log("Logged out successfully");
      } else {
        console.error("Failed to log out");
      }
    } catch(error) {
      console.error('Error logging out:', error);
    }

    // Update state
    setIsLoggedIn(false);
    setUserData(null);
    
    // Close confirmation popup
    setShowLogoutConfirm(false);
  };

  return (
    <>
      {/* Desktop Header */}
      <header className="header">
        <div className="header__topbar"> :) WELCOME TO THE HABITAT EDIT*</div>
        <div className="header__main">
          <Link to="/" className="header__logo">T H E</Link>
          <nav className="header__nav">
            <Link to={`/`} className="nav__link">
              <a href="#">HOME</a>
            </Link>
            <Link to="/products" ><a href="#">PRODUCTS</a> </Link>
           <> <Link to="/about"><a href="#">ABOUT US</a></Link> </>
            <a href="#">CONTACT</a>
            
          </nav>
          <div className="header__actions">
            <div className="user-dropdown" ref={desktopDropdownRef}>
              <div className="user-icon-wrapper" onClick={toggleDesktopDropdown}>
                <img src={require("../assets/images/user-icon.png")} alt="User" className="user-icon" />
              </div>
              {isDesktopDropdownOpen && (
                <div className="dropdown-menu">
                  {!isLoggedIn ? (
                    <a 
                      href="#" 
                      className="dropdown-item"
                      onClick={(e) => {
                        e.preventDefault();
                        openLoginPopup();
                      }}
                    >
                      LOGIN
                    </a>
                  ) : (
                    <>
                      <div className="dropdown-user-info">
                        Hello, {userData?.firstName || "User"}
                        {!userData && <div className="loading-indicator">Loading...</div>}
                      </div>
                      <a 
                        href="#" 
                        className="dropdown-item"
                        onClick={showLogoutConfirmation}
                      >
                        LOGOUT
                      </a>
                    </>
                  )}
                  <a href="#" className="dropdown-item">YOUR ORDERS</a>
                  <a href="#" className="dropdown-item">YOUR WISHLIST</a>
                </div>
              )}
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
            <div className="mobile-user-wrapper">
              <div className="mobile-user-icon-wrapper" onClick={!isLoggedIn ? openLoginPopup : showLogoutConfirmation}>
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
            <Link to="/orders" className="mobile-nav-link" onClick={toggleMobileMenu}>
              YOUR ORDERS
            </Link>
            <Link to="/wishlist" className="mobile-nav-link" onClick={toggleMobileMenu}>
              YOUR WISHLIST
            </Link>
          </nav>
          
        </div>
      </div>

      {/* Login Popup */}
      <LoginPopup isOpen={isLoginPopupOpen} onClose={closeLoginPopup} onLoginSuccess={handleLoginSuccess} />
      
      {/* Logout Confirmation Popup */}
      {showLogoutConfirm && (
        <div className="logout-confirmation-overlay">
          <div className="logout-confirmation">
            <h3>Confirm Logout</h3>
            <p>Are you sure you want to log out?</p>
            <div className="logout-confirmation__buttons">
              <button className="cancel-btn" onClick={cancelLogout}>Cancel</button>
              <button className="confirm-btn" onClick={handleLogout}>Yes, Log Out</button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Header;
