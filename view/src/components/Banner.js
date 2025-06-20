// Banner.js
import React from 'react';
import '../assets/css/Banner.css';

const Banner = () => (
  <div className="banner">
    <div className="banner__content">
      <span>CAPTURE PRECISION, ANYTIME, ANYWHERE.</span>
      <p>Get fast, precise scans anywhere with our advanced Imaging Laser Scanner.</p>
      <button>EXPLORE</button>
    </div>
    <div className="banner__img">
      <img src={require('../assets/images/scanner.png')} alt="Scanner" />
    </div>
  </div>
);

export default Banner;
