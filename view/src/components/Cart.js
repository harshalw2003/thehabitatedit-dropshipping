import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Header from './Header';
import LoginPopup from './LoginPopup';
import Footer from './Footer';
import '../assets/css/Cart.css';
import { getCart, updateCartItemQuantity, removeFromCart, fetchProductById } from '../api/shopify';
import '../assets/css/LoadingAnimations.css';

const Cart = () => {
  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [showLoginPopup, setShowLoginPopup] = useState(false);
  
  // Check if user is logged in
  useEffect(() => {
    const checkAuthStatus = () => {
      const authStatus = localStorage.getItem('isLoggedIn') === 'true';
      const authToken = localStorage.getItem('authToken');
      setIsLoggedIn(authStatus && authToken);
      setLoading(false);
    };
    
    checkAuthStatus();
  }, []);
  
  // Fetch cart data from backend
  useEffect(() => {
    const loadCart = async () => {
      // Only load cart if user is logged in
      if (!isLoggedIn) {
        setLoading(false);
        return;
      }
      
      try {
        setLoading(true);
        const cartData = await getCart();
        
        // Now fetch complete product details for each cart item
        const cartItemsWithDetails = await Promise.all(
          cartData.map(async (item) => {
            // Fetch product details from the backend
            const productDetails = await fetchProductById(item.productHandle);
            
            if (!productDetails) {
              throw new Error(`Could not fetch details for product ${item.productHandle}`);
            }
            
            // Find the specific variant
            const variant = productDetails.variants.edges.find(
              edge => edge.node.id.includes(item.variantId)
            )?.node;
            
            if (!variant) {
              throw new Error(`Variant ${item.variantId} not found for product ${item.productHandle}`);
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
  }, [isLoggedIn]); // Add isLoggedIn as dependency

  // Handle successful login
  const handleLoginSuccess = () => {
    setShowLoginPopup(false);
    setIsLoggedIn(true);
    // The cart will reload automatically due to the useEffect dependency
  };

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

    function trimProductTitle(title, maxWords = 5, maxChars = 50) {
  const words = title.split(" ");

  // If it's already short, return as-is
  if (title.length <= maxChars && words.length <= maxWords) return title;

  // Remove filler/low-value words (optional enhancement)
  const skipWords = ["with", "for", "and", "the", "of"];
  const filtered = words.filter(word => !skipWords.includes(word.toLowerCase()));

  // Pick first few important words
  const trimmed = filtered.slice(0, maxWords).join(" ");

  return trimmed.length > maxChars
    ? trimmed.slice(0, maxChars).trim()
    : trimmed;

}

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
      <div className="cart-main-layout">
        <h1 className="cart-title">YOUR BAG</h1>
        {!isLoggedIn ? (
          <div className="cart-login-required">
            <div className="login-prompt">
              <h2>Login to access your cart</h2>
              <p>Please log in to view and manage your shopping cart items.</p>
              <button className="login-button" onClick={() => setShowLoginPopup(true)}>Login</button>
              <Link to="/" className="continue-shopping">Continue Shopping</Link>
            </div>
          </div>
        ) : loading && cartItems.length === 0 ? (
          <div className="cart-loading">
            <div className="loading-spinner">
              <div className="spinner-circle"></div>
              <div className="spinner-text">Loading your cart...</div>
            </div>
          </div>
        ) : error ? (
          <div className="cart-error">
            <p>{error}</p>
            <button onClick={() => window.location.reload()} className="retry-button">Try Again</button>
          </div>
        ) : cartItems.length === 0 ? (
          <div className="cart-empty">
            <p>Your bag is empty</p>
            <Link to="/" className="continue-shopping">Continue Shopping</Link>
          </div>
        ) : (
          <div className="cart-layout">
            <div className="cart-items-section">
              {cartItems.map(item => (
                <div className="cart-item-row" key={`${item.id}-${item.variantId}`}>
                  <div className="cart-item-img">
                    <Link to={`/product/${item.id}`}>
                      <img src={item.image} alt={item.name} />
                    </Link>
                  </div>
                  <div className="cart-item-info">
                    <div className="cart-item-header">
                      <span className="cart-item-title">{item.name}</span>
                      <button className="cart-item-remove" onClick={() => removeItem(item.id, item.variantId)} disabled={loading}>×</button>
                    </div>
                    <div className="cart-item-details">
                      <span className="cart-item-category">₹{item.price.toFixed(2)}</span>
                    </div>
                    <div className="cart-item-qty-row">
                      <span>QUANTITY</span>
                      <button onClick={() => updateQuantity(item.id, item.variantId, item.quantity - 1)} disabled={loading || item.quantity <= 1}>-</button>
                      <span className="cart-item-qty">{item.quantity}</span>
                      <button onClick={() => updateQuantity(item.id, item.variantId, item.quantity + 1)} disabled={loading}>+</button>
                    </div>
                  </div>
                  <div className="cart-item-price"></div>
                </div>
              ))}
            </div>
            <div className="cart-summary-section">
              <div className="cart-summary-list">
                {cartItems.map(item => (
                  <div className="cart-summary-row" key={item.id + item.variantId}>
                    <span className="cart-summary-title">{trimProductTitle(item.name)}</span>
                    <span>₹{(item.price * item.quantity).toFixed(2)}</span>
                  </div>
                ))}
                <div className="cart-summary-row">
                  <span>Sales Tax</span>
                  <span>Included</span>
                </div>
                <div className="cart-summary-total">
                  <span>Total</span>
                  <span>₹{total.toFixed(2)}</span>
                </div>
              </div>
              <button className="cart-checkout-btn">PROCEED TO CHECKOUT</button>
            </div>
          </div>
        )}
        {/* Recommended Products Section */}
        <div className="cart-recommended-section">
          <h2 className="cart-recommended-title">RECOMMENDED PRODUCT</h2>
          <div className="cart-recommended-list">
            {/* Example recommended products, replace with real data if available */}
            {cartItems.slice(0, 4).map(item => (
              <div className="cart-recommended-item" key={item.id + '-rec'}>
                <img src={item.image} alt={item.name} />
                <div className="cart-recommended-name">{item.name}</div>
                <div className="cart-recommended-price">₹{item.price.toFixed(2)}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
      <Footer />
      {/* Login Popup */}
      <LoginPopup 
        isOpen={showLoginPopup} 
        onClose={() => setShowLoginPopup(false)}
        onLoginSuccess={handleLoginSuccess}
      />
    </div>
  );
}

  export default Cart;
