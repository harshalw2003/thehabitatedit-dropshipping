// Header.js
import React, { useState } from 'react';
import '../assets/css/Header.css';
import LoginPopup from './LoginPopup';
import { Link } from 'react-router-dom';

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
          <div className="header__logo">T H E</div>
          <nav className="header__nav">
           
             <Link to={`/`} className="nav__link">
              <a href="#">HOME</a>
             </Link>
            <a href="#">APPAREL</a>
            <a href="#">BAGS</a>
            <a href="#">SHOES</a>
            <a href="#">HOLIDAY PICKS</a>
            <a href="#">OTHERS</a>
          </nav>
          <div className="header__actions">
            <a href="#" onClick={(e) => {e.preventDefault(); openLoginPopup()}}>LOGIN</a>
            <Link to="/cart" className="bag-link">BAG (03)</Link>
          </div>
        </div>
      </header>

      {/* Mobile Header */}
      <header className="mobile-header">
        <div className="mobile-header__logo">MOSS</div>
        <button 
          className="mobile-header__menu-btn" 
          onClick={toggleMobileMenu}
          aria-label="Toggle menu"
        >
          MENU
        </button>
      </header>

      {/* Mobile Menu Slide-in */}
      <div className={`mobile-menu-container ${isMobileMenuOpen ? 'open' : ''}`}>
        <div className="mobile-menu-overlay" onClick={toggleMobileMenu}></div>
        <div className="mobile-menu-content">
          <div className="mobile-menu-header">
            <button className="close-menu-btn" onClick={toggleMobileMenu}>×</button>
          </div>
          <nav className="mobile-menu-nav">
            <Link to="/" className="mobile-nav-link" onClick={toggleMobileMenu}>HOME</Link>
            <a href="#" className="mobile-nav-link">APPAREL</a>
            <a href="#" className="mobile-nav-link">BAGS</a>
            <a href="#" className="mobile-nav-link">SHOES</a>
            <a href="#" className="mobile-nav-link">HOLIDAY PICKS</a>
            <a href="#" className="mobile-nav-link">OTHERS</a>
          </nav>
          <div className="mobile-menu-actions">
            <a href="#" className="mobile-action-link" onClick={(e) => {
              e.preventDefault();
              toggleMobileMenu();
              setTimeout(openLoginPopup, 300);
            }}>LOGIN</a>
            <Link to="/cart" className="mobile-action-link" onClick={toggleMobileMenu}>BAG (03)</Link>
          </div>
        </div>
      </div>

      <LoginPopup isOpen={isLoginPopupOpen} onClose={closeLoginPopup} />
    </>
  );
};

export default Header;
