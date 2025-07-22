import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Header from './Header';
import '../assets/css/Cart.css';

const Cart = () => {
  // Mock cart data - in a real application, this would come from a state management system
  const [cartItems, setCartItems] = useState([
    {
      id: 'p1',
      name: 'VERA PREMIUM CERAMIC CUP',
      category: 'KITCHEN GEAR',
      price: 94.00,
      quantity: 2,
      color: 'White',
      image: 'https://placehold.co/300x300/f5f2ef/3a2926?text=VERA+CUP',
    },
    {
      id: 'p2',
      name: 'MOCHA MATE',
      category: 'KITCHEN GEAR',
      price: 89.00,
      quantity: 1,
      color: 'Black',
      image: 'https://placehold.co/300x300/f5f2ef/3a2926?text=MOCHA+MATE',
    }
  ]);

  // Calculate cart summary
  const subtotal = cartItems.reduce((total, item) => total + (item.price * item.quantity), 0);
  const shipping = subtotal >= 50 ? 0 : 10;
  const tax = subtotal * 0.1; // Assuming 10% tax
  const total = subtotal + shipping + tax;

  // Update item quantity
  const updateQuantity = (id, newQuantity) => {
    if (newQuantity < 1) return;
    
    setCartItems(cartItems.map(item => 
      item.id === id ? { ...item, quantity: newQuantity } : item
    ));
  };

  // Remove item from cart
  const removeItem = (id) => {
    setCartItems(cartItems.filter(item => item.id !== id));
  };

  return (
    <div className="cart-page">
      <Header />
      
      <div className="cart-container">
        <h1 className="cart-title">YOUR BAG</h1>
        
        {cartItems.length === 0 ? (
          <div className="cart-empty">
            <p>Your bag is empty</p>
            <Link to="/" className="continue-shopping">Continue Shopping</Link>
          </div>
        ) : (
          <div className="cart-content">
            <div className="cart-items">
              <div className="cart-headers">
                <div className="cart-header product-col">PRODUCT</div>
                <div className="cart-header price-col">PRICE</div>
                <div className="cart-header quantity-col">QUANTITY</div>
                <div className="cart-header subtotal-col">SUBTOTAL</div>
              </div>
              
              {cartItems.map(item => (
                <div className="cart-item" key={item.id}>
                  <div className="product-col">
                    <div className="product-image">
                      <img src={item.image} alt={item.name} />
                    </div>
                    <div className="product-details">
                      <h3 className="product-name">{item.name}</h3>
                      <p className="product-category">{item.category}</p>
                      {item.color && <p className="product-color">Color: {item.color}</p>}
                      <button 
                        className="remove-item" 
                        onClick={() => removeItem(item.id)}
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                  
                  <div className="price-col">
                    £{item.price.toFixed(2)}
                  </div>
                  
                  <div className="quantity-col">
                    <div className="quantity-selector">
                      <button onClick={() => updateQuantity(item.id, item.quantity - 1)}>-</button>
                      <input 
                        type="number" 
                        value={item.quantity} 
                        onChange={(e) => updateQuantity(item.id, parseInt(e.target.value) || 1)}
                        min="1"
                      />
                      <button onClick={() => updateQuantity(item.id, item.quantity + 1)}>+</button>
                    </div>
                  </div>
                  
                  <div className="subtotal-col">
                    £{(item.price * item.quantity).toFixed(2)}
                  </div>
                </div>
              ))}
            </div>
            
            <div className="cart-summary">
              <h2>ORDER SUMMARY</h2>
              
              <div className="summary-row">
                <span>Subtotal</span>
                <span>£{subtotal.toFixed(2)}</span>
              </div>
              
              <div className="summary-row">
                <span>Shipping</span>
                <span>{shipping === 0 ? 'Free' : `£${shipping.toFixed(2)}`}</span>
              </div>
              
              <div className="summary-row">
                <span>Estimated Tax</span>
                <span>£{tax.toFixed(2)}</span>
              </div>
              
              <div className="summary-total">
                <span>Total</span>
                <span>£{total.toFixed(2)}</span>
              </div>
              
              <div className="promo-code">
                <input type="text" placeholder="Promo Code" />
                <button>Apply</button>
              </div>
              
              <button className="checkout-button">PROCEED TO CHECKOUT</button>
              
              <Link to="/" className="continue-shopping">Continue Shopping</Link>
              
              <div className="payment-methods">
                <span>We Accept</span>
                <div className="payment-icons">
                  <span className="payment-icon">Visa</span>
                  <span className="payment-icon">MC</span>
                  <span className="payment-icon">Amex</span>
                  <span className="payment-icon">PayPal</span>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Cart;
