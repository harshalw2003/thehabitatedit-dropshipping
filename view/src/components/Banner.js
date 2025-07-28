// Banner.js
import React from 'react';
import '../assets/css/Banner.css';
import '../assets/css/Hero.css';

const Banner = () => (
  <div className="banner">
    <div className="banner__content">
      <span>CAPTURE PRECISION, ANYTIME, ANYWHERE.</span>
      <p>Get fast, precise scans anywhere with our advanced Imaging Laser Scanner.</p>
      <button>EXPLORE</button>
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
