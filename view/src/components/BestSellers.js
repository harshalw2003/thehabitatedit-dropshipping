// BestSellers.js
import React from 'react';
import '../assets/css/BestSellers.css';

const BestSellers = () => (
  <section className="bestsellers">
    <h3>BESTSELLERS</h3>
    <div className="bestsellers__card">
      <div className="bestsellers__img"><img src={require('../assets/images/vera-cup.png')} alt="Vera Premium Ceramic Cup" /></div>
      <div className="bestsellers__info">
        <span>Limited edition</span>
        <h4>VERA PREMIUM CERAMIC CUP</h4>
        <div className="bestsellers__rating">★ 4.9 (589 Reviews)</div>
        <div className="bestsellers__price">£94.00</div>
      </div>
    </div>
  </section>
);

export default BestSellers;
