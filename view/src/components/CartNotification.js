import React, { useEffect } from 'react';
import '../assets/css/CartNotification.css';

const CartNotification = ({ message, isVisible, onClose, product }) => {
  useEffect(() => {
    // Automatically close the notification after 4 seconds
    if (isVisible) {
      const timer = setTimeout(() => {
        onClose();
      }, 4000);
      
      return () => clearTimeout(timer); // Cleanup the timer when component unmounts or notification changes
    }
  }, [isVisible, onClose]);

  if (!isVisible) return null;

  return (
    <div className="cart-notification">
      <div className="cart-notification__content">
        {product && product.image && (
          <div className="cart-notification__image">
            <img src={product.image} alt={product.title} />
          </div>
        )}
        <div className="cart-notification__info">
          <div className="cart-notification__message">{message}</div>
          {product && product.title && (
            <div className="cart-notification__product-title">{product.title}</div>
          )}
        </div>
        <button className="cart-notification__close" onClick={onClose}>×</button>
      </div>
    </div>
  );
};

export default CartNotification;
