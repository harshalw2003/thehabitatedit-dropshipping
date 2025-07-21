import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "../assets/css/ProductGrid.css"; // Make sure this path is correct based on your folder structure
import { fetchProducts, createCart } from "../api/shopify";


export default function ProductGrid() {
  const [products, setProducts] = useState([]);

  // console.log(products)
  useEffect(() => {
    fetchProducts().then(setProducts);
  }, []);

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

  const productsArray = products?.data?.products?.edges || [];
  console.log("Products array", productsArray)
  const cartHandler = (id) => {
    createCart(id).then((checkoutUrl) => {
      window.location.href = checkoutUrl;
    });
  };
  return (
  <section className="product-grid">
    {/* <div className="product-grid__title">
      <h1>Products</h1>
    </div> */}
    <div className="product-grid__list">
      {productsArray.map((product) => (
        <Link to={`/product/${product.node.id}`} className="product-grid__link" key={product.node.id}>
          <div className="product-grid__item">
            <div className="product-grid__img">
              <img
                src={product.node.images.edges[0]?.node.url}
                alt={product.node.images.edges[0]?.node.altText || product.node.title}
              />
            </div>
            <h3 className="product-grid__cat">Bike Accessories</h3>

            <div className="product-grid__name_price">
              <div className="product-grid__name">{trimProductTitle(product.node.title)}</div>
              <div className="product-grid__price">
                ₹{product.node.variants.edges[0].node.price.amount}
              </div>
            </div>
            {/* <button
              className="product-grid__buyNowBtn"
              onClick={(e) => {
                e.preventDefault();
                cartHandler(product.node.variants.edges[0].node.id);
              }}
            >
              ADD TO CART
            </button> */}
          </div>
        </Link>
      ))}
    </div>
  </section>
);

}
