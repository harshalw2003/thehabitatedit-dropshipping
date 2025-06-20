// ProductGrid.js
import React from 'react';
import '../assets/css/ProductGrid.css';

const products = [
  { category: 'KITCHEN GEAR', name: 'MEAL MATES', price: '£29.00', img: 'meal-mates.png' },
  { category: 'KITCHEN GEAR', name: 'MOCHA MATE', price: '£89.00', img: 'mocha-mate.png' },
  { category: 'SELF CARE', name: 'BARBER TOOL', price: '£199.00', img: 'barber-tool.png' },
  { category: 'KITCHEN GEAR', name: 'HOT CUP', price: '£94.00', img: 'hot-cup.png' },
  { category: 'KITCHEN GEAR', name: 'PEUGEOT PARIS MILL', price: '£26.99', img: 'paris-mill.png' },
  { category: 'HOME DECOR', name: 'MARCEL THE SHELL', price: '£33.99', img: 'marcel-shell.png' },
];

const ProductGrid = () => (
  <section className="product-grid">
   
    <div className="product-grid__list">
      {products.map((p, i) => (
        <div className="product-grid__item" key={i}>
          <div className="product-grid__img"><img src={require(`../assets/images/scanner.png`)} alt={p.name} /></div>
          <div className="product-grid__cat">{p.category}</div>
          <div className="product-grid__name">{p.name}</div>
          <div className="product-grid__price">{p.price}</div>
        </div>
      ))}
    </div>
  </section>
);

export default ProductGrid;
