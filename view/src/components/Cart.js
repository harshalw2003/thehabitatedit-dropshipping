import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Header from './Header';
import '../assets/css/Cart.css';
import { getCart, updateCartItemQuantity, removeFromCart, fetchProductById } from '../api/shopify';
import '../assets/css/LoadingAnimations.css';

const Cart = () => {
  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  // Fetch cart data from backend
  useEffect(() => {
    const loadCart = async () => {
      try {
        setLoading(true);
        const cartData = await getCart();
        
        // Now fetch complete product details for each cart item
        const cartItemsWithDetails = await Promise.all(
          cartData.map(async (item) => {
            // Fetch product details from the backend
            const productDetails = await fetchProductById(item.productHandle);
            
            if (!productDetails) {
              throw new Error(`Could not fetch details for product ${item.productId}`);
            }
            
            // Find the specific variant
            const variant = productDetails.variants.edges.find(
              edge => edge.node.id.includes(item.variantId)
            )?.node;
            
            if (!variant) {
              throw new Error(`Variant ${item.variantId} not found for product ${item.productId}`);
            }
            
            return {
              id: item.productId,
              handle: item.productHandle,
              variantId: item.variantId,
              name: productDetails.title,
              category: productDetails.collections.edges[0]?.node.title || 'Uncategorized',
              price: parseFloat(variant.price.amount),
              quantity: item.quantity,
              image: productDetails.images.edges[0]?.node.url || '',
              // Additional properties as needed
              color: variant.title !== 'Default Title' ? variant.title : null
            };
          })
        );
        
        setCartItems(cartItemsWithDetails);
      } catch (err) {
        console.error('Error loading cart:', err);
        setError('Failed to load your cart. Please try again later.');
      } finally {
        setLoading(false);
      }
    };
    
    loadCart();
  }, []);

  // Calculate cart summary
  const subtotal = cartItems.reduce((total, item) => total + (item.price * item.quantity), 0);
  const shipping = subtotal >= 50 ? 0 : 10;
  const tax = subtotal * 0.1; // Assuming 10% tax
  const total = subtotal + shipping + tax;

  // Update item quantity
  const updateQuantity = async (id, variantId, newQuantity) => {
    if (newQuantity < 1) return;
    
    try {
      setLoading(true);
      
      // Call API to update quantity
      await updateCartItemQuantity(id, variantId, newQuantity);
      
      // Update local state
      setCartItems(cartItems.map(item => 
        item.id === id && item.variantId === variantId 
          ? { ...item, quantity: newQuantity } 
          : item
      ));
    } catch (err) {
      console.error('Error updating quantity:', err);
      setError('Failed to update quantity. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  // Remove item from cart
  const removeItem = async (id, variantId) => {
    try {
      setLoading(true);
      
      // Call API to remove item
      await removeFromCart(id, variantId);
      
      // Update local state
      setCartItems(cartItems.filter(item => !(item.id === id && item.variantId === variantId)));
    } catch (err) {
      console.error('Error removing item:', err);
      setError('Failed to remove item. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="cart-page">
      <Header />
      
      <div className="cart-container">
        <h1 className="cart-title">YOUR BAG</h1>
        
        {loading && cartItems.length === 0 ? (
          <div className="cart-loading">
            <div className="loading-spinner">
              <div className="spinner-circle"></div>
              <div className="spinner-text">Loading your cart...</div>
            </div>
          </div>
        ) : error ? (
          <div className="cart-error">
            <p>{error}</p>
            <button onClick={() => window.location.reload()} className="retry-button">
              Try Again
            </button>
          </div>
        ) : cartItems.length === 0 ? (
          <div className="cart-empty">
            <p>Your bag is empty</p>
            <Link to="/" className="continue-shopping">Continue Shopping</Link>
          </div>
        ) : (
          <div className="cart-content">
            {loading && cartItems.length > 0 && (
              <div className="cart-loading-overlay">
                <div className="loading-spinner">
                  <div className="spinner-circle"></div>
                  <div className="spinner-text">Updating cart...</div>
                </div>
              </div>
            )}
            <div className="cart-items">
              <div className="cart-headers">
                <div className="cart-header product-col">PRODUCT</div>
                <div className="cart-header price-col">PRICE</div>
                <div className="cart-header quantity-col">QUANTITY</div>
                <div className="cart-header subtotal-col">SUBTOTAL</div>
              </div>
              
              {cartItems.map(item => (
                <div className="cart-item" key={`${item.id}-${item.variantId}`}>
                  <div className="product-col">
                    <div className="product-image">
                      <Link to={`/product/${item.id}`}>
                        <img src={item.image} alt={item.name} />
                      </Link>
                    </div>
                    <div className="product-details">
                      <h3 className="product-name">{item.name}</h3>
                      <p className="product-category">{item.category}</p>
                      {item.color && <p className="product-color">Color: {item.color}</p>}
                      <button 
                        className="remove-item" 
                        onClick={() => removeItem(item.id, item.variantId)}
                        disabled={loading}
                      >
                        {loading ? 'Removing...' : 'Remove'}
                      </button>
                    </div>
                  </div>
                  
                  <div className="price-col">
                    ₹{item.price.toFixed(2)}
                  </div>
                  
                  <div className="quantity-col">
                    <div className="quantity-selector">
                      <button 
                        onClick={() => updateQuantity(item.id, item.variantId, item.quantity - 1)}
                        disabled={loading || item.quantity <= 1}
                      >-</button>
                      <input 
                        type="number" 
                        value={item.quantity} 
                        onChange={(e) => updateQuantity(item.id, item.variantId, parseInt(e.target.value) || 1)}
                        min="1"
                        disabled={loading}
                      />
                      <button 
                        onClick={() => updateQuantity(item.id, item.variantId, item.quantity + 1)}
                        disabled={loading}
                      >+</button>
                    </div>
                  </div>
                  
                  <div className="subtotal-col">
                    ₹{(item.price * item.quantity).toFixed(2)}
                  </div>
                </div>
              ))}
            </div>
            
            <div className="cart-summary">
              <h2>ORDER SUMMARY</h2>
              
              <div className="summary-row">
                <span>Subtotal</span>
                <span>₹{subtotal.toFixed(2)}</span>
              </div>
              
              <div className="summary-row">
                <span>Shipping</span>
                <span>{shipping === 0 ? 'Free' : `₹${shipping.toFixed(2)}`}</span>
              </div>
              
              <div className="summary-row">
                <span>Estimated Tax</span>
                <span>₹{tax.toFixed(2)}</span>
              </div>
              
              <div className="summary-total">
                <span>Total</span>
                <span>₹{total.toFixed(2)}</span>
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

              <div className="secure-checkout">
                <div className="secure-icon">🔒</div>
                <span>Secure Checkout</span>
              </div>
            </div>
          </div>
        )}
        
        <div className="cart-features">
          <div className="feature">
            <div className="feature-icon">✓</div>
            <div className="feature-content">
              <h4>Quality Guaranteed</h4>
              <p>All products are carefully selected for quality and durability</p>
            </div>
          </div>
          <div className="feature">
            <div className="feature-icon">🚚</div>
            <div className="feature-content">
              <h4>Fast Shipping</h4>
              <p>Orders over £50 qualify for free shipping</p>
            </div>
          </div>
          <div className="feature">
            <div className="feature-icon">↩️</div>
            <div className="feature-content">
              <h4>Easy Returns</h4>
              <p>30-day hassle-free return policy</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
