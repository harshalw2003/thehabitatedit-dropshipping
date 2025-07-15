import React, { useEffect, useState } from "react";
import "../assets/css/ProductGrid.css"; // Make sure this path is correct based on your folder structure
import { fetchProducts, createCart } from "../api/shopify";


export default function Products() {
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
    <div className="grid grid-cols-3 gap-4 p-4">
      {productsArray.map((product) => (

        <div key={product.node.id} className="border p-2 rounded-lg">
          {/* <h3 className="text-lg font-bold">{product.node.title}</h3>
           <img
             src={product.node.images.edges[0]?.node.url}
             alt={product.node.images.edges[0]?.node.altText || product.node.title}
             className="w-full h-48 object-cover rounded"
           />
        
           <p className="text-sm text-gray-600">{product.description}</p>
           <p className="text-green-600 font-semibold">
             ₹{product.node.variants.edges[0]?.node.price.amount}
           </p> */}


          <img src={product.node.images.edges[0]?.node.url} alt={product.node.images.edges[0]?.node.altText || product.node.title} />
          <h3>{product.node.title}</h3>
          <p>₹{product.node.variants.edges[0].node.price.amount}</p>
          <button onClick={() => cartHandler(product.node.variants.edges[0].node.id)}>Buy Now</button>
        </div>
      ))}
    </div>
  );
}
