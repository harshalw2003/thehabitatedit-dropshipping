// Header.js
import React, { useState } from "react";
import "../assets/css/Header.css";
import LoginPopup from "./LoginPopup";
import { Link } from "react-router-dom";

const Header = () => {
  const [isLoginPopupOpen, setIsLoginPopupOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const openLoginPopup = () => {
    setIsLoginPopupOpen(true);
  };

  const closeLoginPopup = () => {
    setIsLoginPopupOpen(false);
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
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
            <a href="#">TECH & GADGETS</a>
            <a href="#">SELF CARE</a>
            <a href="#">HOME DECOR</a>
            <a href="#">AUTO CARE</a>
            <a href="#">OTHERS</a>
          </nav>
          <div className="header__actions">
            <a
              href="#"
              onClick={(e) => {
                e.preventDefault();
                openLoginPopup();
              }}
            >
              LOGIN
            </a>
            <Link to="/cart" className="bag-link">
              BAG (03)
            </Link>
          </div>
        </div>
      </header>

      {/* Mobile Header */}
      <header className="mobile-header">
        <div className="header__topbar"> :) WELCOME TO THE HABITAT EDIT*</div>

        <div className="mobile_header__main">
          <div className="mobile-menu-actions">
            <a
              href="#"
              className="mobile-action-link"
              onClick={(e) => {
                e.preventDefault();
                // toggleMobileMenu();
                setTimeout(openLoginPopup, 300);
              }}
            >
              <img src={require("../assets/images/user-icon.png")} alt="User" />
            </a>
            <Link
              to="/cart"
              className="mobile-action-link"
              onClick={toggleMobileMenu}
            >
              <img src={require("../assets/images/shopping-cart.png")} alt="Cart" />
            </Link>
          </div>
        <Link to="/" className="mobile-header__logo">T H E</Link>
        {/* <button
          className="mobile-header__menu-btn"
          aria-label="Toggle menu"
        > */}
          <input className="toggle-checkbox mobile-header__menu-btn" onClick={toggleMobileMenu} id="toggle" type="checkbox" />
          <label className="hamburger" htmlFor="toggle">
            <div className="bar"></div>
            <div className="bar"></div>
            <div className="bar"></div>
          </label>
        {/* </button> */}
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
