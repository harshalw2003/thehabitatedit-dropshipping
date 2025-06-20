// MobileMenu.js
import React from 'react';
import '../assets/css/MobileMenu.css';

const MobileMenu = () => (
  <div className="mobile-menu">
    <div className="mobile-menu__topbar">*Fast & Free Shipping on Orders Over $50*</div>
    <div className="mobile-menu__header">
      <span className="mobile-menu__logo">MOSS</span>
      <button className="mobile-menu__btn">MENU</button>
    </div>
    <div className="mobile-menu__user">
      <span className="mobile-menu__avatar"></span>
      <span>30% Flat Sale<br/>Last-Minute Deals</span>
    </div>
    <div className="mobile-menu__discover">DISCOVER EVERYTHING YOU NEED IN ONE PLACE</div>
    <div className="mobile-menu__products">
      <div className="mobile-menu__product">MOCHA MATE</div>
      <div className="mobile-menu__product">SWIFT WRITE</div>
    </div>
  </div>
);

export default MobileMenu;
