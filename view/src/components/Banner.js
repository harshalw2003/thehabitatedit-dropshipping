// Banner.js
import React from 'react';
import '../assets/css/Banner.css';
import '../assets/css/Hero.css';
import { Link } from 'react-router-dom';

const Banner = () => (
  <div className="banner">
    <div className="banner__content">
      <span className='banner__content__title'>ESSENTIALS THAT INSPIRE <br/> PRICES THAT AMAZE</span>
      <p>From self-care to smart tech,
we bring comfort, style, and innovation to your everyday life</p>
      <Link to="/products" className='explore-btn'><button>EXPLORE PRODUCTS  <span className="material-symbols-outlined">arrow_right_alt</span></button></Link>
    </div>
    <div className="banner__img">
      {/* <img src={require('../assets/images/scanner.png')} alt="Scanner" /> */}
       <div className='hero_info'>
      <div className='hero_images'>
       
        <div className='hero_images__overlay hero_images__overlay--left'>
          <h4>T H E</h4>
        </div>
        <div className='hero_images__overlay hero_images__overlay--right'>
          <img src={require('../assets/images/up-right.png')} alt="Hero Overlay" />
        </div>
      </div>  
    <p>
        THE HABITAT EDIT. 
    </p>
    </div>
    </div>
  </div>
);

export default Banner;
