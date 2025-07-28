// Header.js
import React, { useState, useRef, useEffect } from "react";
import "../assets/css/Header.css";
import LoginPopup from "./LoginPopup";
import { Link } from "react-router-dom";

const Header = () => {
  const [isLoginPopupOpen, setIsLoginPopupOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isDesktopDropdownOpen, setIsDesktopDropdownOpen] = useState(false);
  const [isMobileDropdownOpen, setIsMobileDropdownOpen] = useState(false);
  
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
            <a href="#">ABOUT US</a>
            <a href="#">CONTACT</a>
            <a href="#">HOME DECOR</a>
            
          </nav>
          <div className="header__actions">
            <div className="user-dropdown" ref={desktopDropdownRef}>
              <div className="user-icon-wrapper" onClick={toggleDesktopDropdown}>
                <img src={require("../assets/images/user-icon.png")} alt="User" className="user-icon" />
              </div>
              {isDesktopDropdownOpen && (
                <div className="dropdown-menu">
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
                  <a href="#" className="dropdown-item">YOUR ORDERS</a>
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
            <div className="mobile-user-dropdown" ref={mobileDropdownRef}>
              <div className="mobile-user-icon-wrapper" onClick={toggleMobileDropdown}>
                <img src={require("../assets/images/user-icon.png")} alt="User" className="mobile-user-icon" />
              </div>
              {isMobileDropdownOpen && (
                <div className="mobile-dropdown-menu">
                  <a 
                    href="#" 
                    className="mobile-dropdown-item"
                    onClick={(e) => {
                      e.preventDefault();
                      openLoginPopup();
                    }}
                  >
                    LOGIN
                  </a>
                  <a href="#" className="mobile-dropdown-item">YOUR ORDERS</a>
                </div>
              )}
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
            <a href="#" className="mobile-nav-link">
              TECH & GADGETS
            </a>
            <a href="#" className="mobile-nav-link">
              SELF CARE
            </a>
            <a href="#" className="mobile-nav-link">
              HOME DECOR
            </a>
            <a href="#" className="mobile-nav-link">
              AUTO CARE
            </a>
            <a href="#" className="mobile-nav-link">
              OTHERS
            </a>
          </nav>
          
        </div>
      </div>

      <LoginPopup isOpen={isLoginPopupOpen} onClose={closeLoginPopup} />
    </>
  );
};

export default Header;
