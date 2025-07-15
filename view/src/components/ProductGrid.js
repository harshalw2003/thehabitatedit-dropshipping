import React, { useEffect, useState } from "react";
import "../assets/css/ProductGrid.css"; // Make sure this path is correct based on your folder structure
import { fetchProducts, createCart } from "../api/shopify";


export default function ProductGrid() {
  const [products, setProducts] = useState([]);

  // console.log(products)
  useEffect(() => {
    fetchProducts().then(setProducts);
  }, []);

  const productsArray = products?.data?.products?.edges || [];
  console.log("Products array", productsArray)
  const cartHandler = (id) => {
    createCart(id).then((checkoutUrl) => {
      window.location.href = checkoutUrl;
    });
  };
  return (
  <section className="product-grid">
    <div className="product-grid__title">
      <h1>Products</h1>
    </div>
    <div className="product-grid__list">
      {productsArray.map((product) => (
        <div className="product-grid__item" key={product.node.id}>
          <div className="product-grid__img">
            <img
              src={product.node.images.edges[0]?.node.url}
              alt={product.node.images.edges[0]?.node.altText || product.node.title}
            />
          </div>
          <div className="product-grid__name">{product.node.title}</div>
          <div className="product-grid__price">
            ₹{product.node.variants.edges[0].node.price.amount}
          </div>
          <button
            className="product-grid__buyNowBtn"
            onClick={() => cartHandler(product.node.variants.edges[0].node.id)}
          >
            Buy Now
          </button>
        </div>
      ))}
    </div>
  </section>
);

}
