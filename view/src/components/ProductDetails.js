import React, { useEffect, useState, useMemo } from 'react';
import { Link, useParams } from 'react-router-dom';
import Header from './Header';
import '../assets/css/ProductDetails.css';
import '../assets/css/LoadingAnimations.css'; // Import loading animations
import Banner from './Banner';
import ProductGrid from './ProductGrid';
const ip = "localhost"; // Define your IP address or endpoint here

const ProductDetails = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [selectedImage, setSelectedImage] = useState(0);
  const [quantity, setQuantity] = useState(1);
  // const [activeTab, setActiveTab] = useState('features');
  const [showFullDescription, setShowFullDescription] = useState(false);
  const [loading, setLoading] = useState(true); // Add loading state

  // Scroll to top when component mounts or id changes
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [id]);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        setLoading(true); // Set loading to true when fetching starts
        const response = await fetch(`http://${ip}:8001/shopify/product/${id}`, {
          method: 'POST',
        });

        const data = await response.json();
        console.log("Fetched product:", data.node);
        setProduct(data.node); // ✅ Directly access the node object
      } catch (error) {
        console.error("Error fetching product:", error);
      } finally {
        setLoading(false); // Set loading to false when fetch completes (success or error)
      }
    };

    if (id) {
      fetchProduct();
    }
  }, [id]);

  if (loading) {
    return <div className="loading-spinner">Loading...</div>; // Show loading spinner
  }

  if (!product) {
    return <div>Product not found</div>;
  }

  //   const relatedProducts = [
  //   {
  //     id: 'p2',
  //     name: 'MOCHA MATE',
  //     category: 'KITCHEN GEAR',
  //     price: 89.00,
  //     image: 'https://placehold.co/300x300/f5f2ef/3a2926?text=MOCHA+MATE',
  //   },
  //   {
  //     id: 'p3',
  //     name: 'MEAL MATES',
  //     category: 'KITCHEN GEAR',
  //     price: 29.00,
  //     image: 'https://placehold.co/300x300/f5f2ef/3a2926?text=MEAL+MATES',
  //   },
  //   {
  //     id: 'p4',
  //     name: 'HOT CUP',
  //     category: 'KITCHEN GEAR',
  //     price: 94.00,
  //     image: 'https://placehold.co/300x300/f5f2ef/3a2926?text=HOT+CUP',
  //   }
  // ];

  // Sample values for missing keys (mocked)
  const productRating = 4.3;
  const reviewCount = 42;
  const stock = 20;

  const increaseQuantity = () => {
    if (quantity < stock) setQuantity(quantity + 1);
  };

  const decreaseQuantity = () => {
    if (quantity > 1) setQuantity(quantity - 1);
  };

  const addToCart = () => {
    alert(`Added ${quantity} of ${product.title} to cart`);
  };

  const addToWishlist = () => {
    alert(`Added ${product.title} to wishlist`);
  };

  return (
    <div className="product-details-page">
      <Header />
      <div className="product-details">
        <div className="breadcrumbs">
          <Link to="/"><span>HOME</span> </Link>/ <span>{product.collections.edges[0].node.title ? product.collections.edges[0].node.title : "" }</span> / <span>{product.title}</span>
        </div> 

        <div className="product-details__main">
          <div className="product-details__images">
            <div className="product-details__thumbnail-list">
              {product.images.edges.map((img, index) => (
                <div
                  key={index}
                  className={`product-details__thumbnail ${selectedImage === index ? 'active' : ''}`}
                  onClick={() => setSelectedImage(index)}
                >
                  <img src={img.node.url} alt={img.node.altText || `Image ${index}`} />
                </div>
              ))}
            </div>

            <div className="product-details__main-image">
              <img src={product.images.edges[selectedImage]?.node.url} alt={product.title} />
            </div>
          </div>

          <div className="product-details__info">
            <h1 className="product-details__name">{product.title}</h1>

            {/* <div className="product-details__rating">
              <div className="stars">
                {'★'.repeat(Math.floor(productRating))}
                {productRating % 1 !== 0 ? '☆' : ''}
                {'☆'.repeat(5 - Math.ceil(productRating))}
              </div>
              <span className="rating-text">{productRating} ({reviewCount} Reviews)</span>
            </div> */}

            <div className="product-details_price_section">
              <span className="product-details__price">
                ₹{product.variants.edges[0].node.price.amount}
              </span>
             
                <span className="product-details__compare-price">
                  ₹1000
                </span>

            </div>

            <div className="product-details__description">
              <div className={`description-text ${showFullDescription ? 'expanded' : ''}`}>
                <p>{product.description}</p>
              </div>
              {product.description && product.description.length > 150 && (
                <button 
                  className="read-more-btn" 
                  onClick={() => setShowFullDescription(!showFullDescription)}
                >
                  {showFullDescription ? 'Read Less' : 'Read More'}
                </button>
              )}
            </div>

            <div className="product-details__quantity">
              <h3>QUANTITY</h3>
              <div className="quantity-selector">
                <button onClick={decreaseQuantity}>-</button>
                <input type="number" value={quantity} readOnly />
                <button onClick={increaseQuantity}>+</button>
              </div>
              <span className="stock-info">Available - In stock</span>
            </div>

            <div className="product-details__actions">
              <button className="add-to-cart-btn" onClick={addToCart}>
                ADD TO CART
              </button>
              <button className="wishlist-btn" onClick={addToWishlist}>
                ♡
              </button>
            </div>

            {/* Product Information Tabs */}
            {/* <div className="product-details__tabs">
              <div className="tabs-header">
                <button 
                  className={`tab-btn ${activeTab === 'features' ? 'active' : ''}`}
                  onClick={() => setActiveTab('features')}
                >
                  Features
                </button>
                <button 
                  className={`tab-btn ${activeTab === 'specs' ? 'active' : ''}`}
                  onClick={() => setActiveTab('specs')}
                >
                  Specifications
                </button>
                <button 
                  className={`tab-btn ${activeTab === 'reviews' ? 'active' : ''}`}
                  onClick={() => setActiveTab('reviews')}
                >
                  Reviews
                </button>
              </div>

              <div className="tab-content">
                {activeTab === 'features' && (
                  <ul className="feature-list">
                    {product.features.map((feature, index) => (
                      <li key={index}>{feature}</li>
                    ))}
                  </ul>
                )}

                {activeTab === 'specs' && (
                  <table className="specs-table">
                    <tbody>
                      {Object.entries(product.specifications).map(([key, value]) => (
                        <tr key={key}>
                          <th>{key}</th>
                          <td>{value}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                )}

                {activeTab === 'reviews' && (
                  <div className="reviews-summary">
                    <p>Based on {product.reviewCount} customer reviews</p>
                    <div className="reviews-stars">
                      {'★'.repeat(Math.floor(product.rating))}
                      {product.rating % 1 !== 0 ? '☆' : ''}
                      {'☆'.repeat(5 - Math.ceil(product.rating))}
                      <span>{product.rating} out of 5</span>
                    </div>
                  </div>
                )}
              </div>
            </div> */}
          </div>
        </div>
        
        {/* Related Products Section */}
        <div className="related-products">
          <h2>YOU MAY ALSO LIKE</h2>
          {/* <div className="related-products__grid">
            {relatedProducts.map(product => (
              <div key={product.id} className="related-product-card">
                <div className="related-product-card__image">
                  <img src={product.image} alt={product.name} />
                </div>
                <div className="related-product-card__category">{product.category}</div>
                <div className="related-product-card__name">{product.name}</div>
                <div className="related-product-card__price">£{product.price.toFixed(2)}</div>
              </div>
            ))}
          </div> */}
          <ProductGrid></ProductGrid>
        </div>
       

        <Banner />
      </div>
    </div>
  );
};

export default ProductDetails;
