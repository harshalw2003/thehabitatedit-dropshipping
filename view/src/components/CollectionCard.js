// CollectionCard.js
import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../assets/css/CollectionCard.css';

const CollectionCard = ({ collection }) => {
  const navigate = useNavigate();
  
  const handleClick = () => {
    // Navigate to products page with the collection as a parameter
    navigate(`/products?collection=${encodeURIComponent(collection.title)}`);
  };
  
  return (
    <div className="collection-card" onClick={handleClick}>
      <div className="collection-card__image-container">
        <img 
          src={collection.image || require('../assets/images/tech-and-gadgets.jpg')} 
          alt={collection.title} 
          className="collection-card__image" 
        />
      </div>
      <div className="collection-card__overlay">
        <h3 className="collection-card__title">{collection.title}</h3>
        <p className="collection-card__description">{collection.description || 'Explore our collection'}</p>
        <button className="collection-card__button">
          SHOP NOW
          <img src={require("../assets/images/up-right.png")} alt="Arrow" className="button-arrow" onClick={handleClick} />
        </button>
      </div>
    </div>
  );
};

export default CollectionCard;
