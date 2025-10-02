import React from 'react';
import '../assets/css/Wishlist.css';

const Wishlist = () => {
  // Mock data for wishlist - replace with actual API call later
  const wishlistItems = [
    {
      id: 1,
      name: 'Smart Watch Pro',
      price: 199.99,
      image: require('../assets/images/tech-and-gadgets.jpg'),
      inStock: true,
      addedDate: '2025-09-15'
    },
    {
      id: 2,
      name: 'Aromatherapy Diffuser',
      price: 49.99,
      image: require('../assets/images/self-care.jpg'),
      inStock: true,
      addedDate: '2025-09-12'
    },
    {
      id: 3,
      name: 'Minimalist Table Lamp',
      price: 89.99,
      image: require('../assets/images/home-decor.jpg'),
      inStock: false,
      addedDate: '2025-09-08'
    }
  ];

  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  return (
    <div className="wishlist-container">
      <div className="wishlist-items">
        {wishlistItems.map((item) => (
          <div key={item.id} className="wishlist-card">
            <div className="item-image">
              <img src={item.image} alt={item.name} />
            </div>
            <div className="item-info">
              <h3>{item.name}</h3>
              <div className="item-meta">
                <span className="item-price">${item.price.toFixed(2)}</span>
                <span className={`stock-status ${item.inStock ? 'in-stock' : 'out-of-stock'}`}>
                  {item.inStock ? 'In Stock' : 'Out of Stock'}
                </span>
              </div>
              <div className="item-date">
                Added on {formatDate(item.addedDate)}
              </div>
            </div>
            <div className="item-actions">
              <button className="btn-add-to-cart" disabled={!item.inStock}>
                {item.inStock ? 'Add to Cart' : 'Notify When Available'}
              </button>
              <button className="btn-remove">Remove</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Wishlist;
