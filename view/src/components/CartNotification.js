import React, { useEffect } from 'react';
import '../assets/css/CartNotification.css';

const CartNotification = ({ message, isVisible, onClose, product, type, onActionClick }) => {
  useEffect(() => {
    // Automatically close the notification after 4 seconds for normal notifications, 6 seconds for login notifications
    if (isVisible) {
      const timer = setTimeout(() => {
        onClose();
      }, type === 'login' ? 6000 : 4000);
      
      return () => clearTimeout(timer); // Cleanup the timer when component unmounts or notification changes
    }
  }, [isVisible, onClose]);

  if (!isVisible) return null;

  return (
    <div className="cart-notification">
      <div className={`cart-notification__content ${type === 'login' ? 'login-required' : ''}`}>
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
          {type === 'login' && (
            <button className="cart-notification__login-btn" onClick={onActionClick}>
              Login
            </button>
          )}
        </div>
        <button className="cart-notification__close" onClick={onClose}>×</button>
      </div>
    </div>
  );
};

export default CartNotification;
