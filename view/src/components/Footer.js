import React, { useState } from 'react';
import Banner from './Banner';
import '../assets/css/Footer.css';

const Footer = () => {
 

  return (
    <footer className="footer">
      {/* Banner Section - Integrated into Footer */}
      <div className="footer__banner">
        <Banner />
      </div>

      {/* Main Footer Content */}
      <div className="footer__main">
        <div className="footer__content">
          {/* Quick Links */}
          <div className="footer__section">
            <h3>Quick Links</h3>
            <ul>
              <li><a href="/">Home</a></li>
              <li><a href="/products">Products</a></li>
              <li><a href="/cart">Cart</a></li>
              <li><a href="/">About</a></li>
              <li><a href="/">Blog</a></li>
              <li><a href="/">Contact</a></li>
            </ul>
          </div>

          {/* Contact & Legal */}
          <div className="footer__section">
            <h3>Contact & Legal</h3>
            <ul>
              <li><a href="mailto:support@yourstore.com">support@yourstore.com</a></li>
              <li><a href="/">Privacy Policy</a></li>
              <li><a href="/">Terms & Conditions</a></li>
              <li><a href="/">Shipping & Returns</a></li>
            </ul>
          </div>

          {/* Join the Conversation */}
          <div className="footer__section">
            <h3>Follow us on!</h3>
            <div className="footer__social">
              <a href="/" className="social-icon"><img src={require('../assets/images/instagram-icon-white.png')} alt="Instagram" /></a>
              <a href="/" className="social-icon"><img src={require('../assets/images/facebook-icon-white.png')} alt="Facebook" /></a>
              <a href="/" className="social-icon"><img src={require('../assets/images/pinterest-icon-white.png')} alt="Pinterest" /></a>
            </div>
          </div>
        </div>

        {/* Newsletter Section */}
        {/* <div className="footer__newsletter">
          <div className="footer__newsletter-content">
            <h3>Never Miss a Deal - Join Our Community!</h3>
            <form onSubmit={handleSubscribe} className="newsletter-form">
              <input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
              <button type="submit">SUBSCRIBE FOR FREE</button>
            </form>
          </div>
        </div> */}

        {/* Copyright */}
        <div className="footer__bottom">
          <p>Copyright © 2024 | THE HABITAT EDIT</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
