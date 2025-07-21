import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import Header from './Header';
import '../assets/css/ProductDetails.css';

const ProductDetails = () => {
  const { id } = useParams();
  console.log("Product ID:", id);
  const [selectedImage, setSelectedImage] = useState(0);
  const [quantity, setQuantity] = useState(1);
  
  // Mock product data - in a real app this would come from an API
  const product = {
    id: id || 'p1',
    name: 'VERA PREMIUM CERAMIC CUP',
    category: 'KITCHEN GEAR',
    price: 94.00,
    rating: 4.9,
    reviewCount: 589,
    description: 'The Vera Premium Ceramic Cup is crafted with high-quality porcelain that maintains optimal temperature for your beverages. Its elegant design and comfortable grip make it perfect for everyday use or special occasions.',
    features: [
      'Premium porcelain construction',
      'Maintains temperature for longer periods',
      'Elegant, minimalist design',
      'Comfortable ergonomic handle',
      'Dishwasher and microwave safe'
    ],
    specifications: {
      'Dimensions': '4.5" H x 3.5" Diameter',
      'Capacity': '12 oz',
      'Material': 'Premium Ceramic',
      'Weight': '0.7 lbs',
      'Color Options': 'White, Black, Beige'
    },
    images: [
      '/vera-cup.png',
      '/vera-cup-angle.png',
      '/vera-cup-set.png'
    ],
    availableColors: ['#FFFFFF', '#000000', '#E5DCD0'],
    stock: 15,
    isLimited: true,
    freeShipping: true
  };
  
  const relatedProducts = [
    {
      id: 'p2',
      name: 'MOCHA MATE',
      category: 'KITCHEN GEAR',
      price: 89.00,
      image: '/mocha-mate.png',
    },
    {
      id: 'p3',
      name: 'MEAL MATES',
      category: 'KITCHEN GEAR',
      price: 29.00,
      image: '/meal-mates.png',
    },
    {
      id: 'p4',
      name: 'HOT CUP',
      category: 'KITCHEN GEAR',
      price: 94.00,
      image: '/hot-cup.png',
    }
  ];

  const increaseQuantity = () => {
    if (quantity < product.stock) {
      setQuantity(quantity + 1);
    }
  };

  const decreaseQuantity = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };

  const addToCart = () => {
    // In a real app, this would add the product to the cart
    alert(`Added ${quantity} of ${product.name} to cart`);
  };

  const addToWishlist = () => {
    // In a real app, this would add the product to the wishlist
    alert(`Added ${product.name} to wishlist`);
  };

  return (
    <div className="product-details-page">
      <Header />
      
      <div className="product-details">
        <div className="breadcrumbs">
          <span>HOME</span> / <span>{product.category}</span> / <span>{product.name}</span>
        </div>
        
        <div className="product-details__main">
          {/* Product Images Section */}
          <div className="product-details__images">
            <div className="product-details__thumbnail-list">
              {product.images.map((img, index) => (
                <div 
                  key={index} 
                  className={`product-details__thumbnail ${selectedImage === index ? 'active' : ''}`}
                  onClick={() => setSelectedImage(index)}
                >
                  <img src={require(`../assets/images${img}`)} alt={`${product.name} view ${index + 1}`} />
                </div>
              ))}
            </div>
            
            <div className="product-details__main-image">
              <img 
                src={require(`../assets/images${product.images[selectedImage]}`)} 
                alt={product.name} 
              />
            </div>
          </div>
          
          {/* Product Info Section */}
          <div className="product-details__info">
            {product.isLimited && <div className="product-details__limited-badge">Limited Edition</div>}
            
            <h1 className="product-details__name">{product.name}</h1>
            
            <div className="product-details__rating">
              <div className="stars">
                {'★'.repeat(Math.floor(product.rating))}
                {product.rating % 1 !== 0 ? '☆' : ''}
                {'☆'.repeat(5 - Math.ceil(product.rating))}
              </div>
              <span className="rating-text">{product.rating} ({product.reviewCount} Reviews)</span>
            </div>
            
            <div className="product-details__price">£{product.price.toFixed(2)}</div>
            
            <div className="product-details__description">
              <p>{product.description}</p>
            </div>
            
            {/* Color Selection */}
            <div className="product-details__colors">
              <h3>COLOR</h3>
              <div className="color-options">
                {product.availableColors.map((color, index) => (
                  <div 
                    key={index}
                    className="color-option"
                    style={{ backgroundColor: color }}
                  />
                ))}
              </div>
            </div>
            
            {/* Quantity Selector */}
            <div className="product-details__quantity">
              <h3>QUANTITY</h3>
              <div className="quantity-selector">
                <button onClick={decreaseQuantity} disabled={quantity <= 1}>-</button>
                <input type="number" value={quantity} readOnly />
                <button onClick={increaseQuantity} disabled={quantity >= product.stock}>+</button>
              </div>
              <span className="stock-info">{product.stock} available</span>
            </div>
            
            {/* Action Buttons */}
            <div className="product-details__actions">
              <button className="add-to-cart-btn" onClick={addToCart}>
                ADD TO CART
              </button>
              <button className="wishlist-btn" onClick={addToWishlist}>
                ♡
              </button>
            </div>
            
            {product.freeShipping && (
              <div className="product-details__shipping">
                <span>✓</span> Free Shipping
              </div>
            )}
            
            {/* Product Information Tabs */}
            <div className="product-details__tabs">
              <div className="tabs-header">
                <button className="tab-btn active">Features</button>
                <button className="tab-btn">Specifications</button>
                <button className="tab-btn">Reviews</button>
              </div>
              
              <div className="tab-content">
                <ul className="feature-list">
                  {product.features.map((feature, index) => (
                    <li key={index}>{feature}</li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
        
        {/* Related Products Section */}
        <div className="related-products">
          <h2>YOU MAY ALSO LIKE</h2>
          <div className="related-products__grid">
            {relatedProducts.map(product => (
              <div key={product.id} className="related-product-card">
                <div className="related-product-card__image">
                  <img src={require(`../assets/images${product.image}`)} alt={product.name} />
                </div>
                <div className="related-product-card__category">{product.category}</div>
                <div className="related-product-card__name">{product.name}</div>
                <div className="related-product-card__price">£{product.price.toFixed(2)}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
