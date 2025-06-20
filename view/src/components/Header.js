// Header.js
import React from 'react';
import '../assets/css/Header.css';

const Header = () => (
  <header className="header">
    <div className="header__topbar">*Fast & Free Shipping on Orders Over $50*</div>
    <div className="header__main">
      <div className="header__logo">MOSS</div>
      <nav className="header__nav">
        <a href="#">DISCOVER</a>
        <a href="#">APPAREL</a>
        <a href="#">BAGS</a>
        <a href="#">SHOES</a>
        <a href="#">HOLIDAY PICKS</a>
        <a href="#">OTHERS</a>
      </nav>
      <div className="header__actions">
        <a href="#">LOGIN</a>
        <a href="#">BAG (03)</a>
      </div>
    </div>
  </header>
);

export default Header;
