const STOREFRONT_ACCESS_TOKEN = "56f906961bd692bea09127012bab9f9e"
const STORE_DOMAIN = "ftap1q-bh.myshopify.com/"



document.addEventListener("DOMContentLoaded",async  () => {

  await fetchProducts()
  // const buyNow = document.getElementsByClassName("buyNowBtn")
  // console.log(buyNow)
  // Array.from(buyNow).forEach((button)=>{

   
  // })
 
});


async function fetchProducts(){

   fetch("http://localhost:8001/shopify/products/", {
    method: "POST",
  })
    .then((res) => res.json())
    .then((products) => {
        // console.log(products)
        const productsArray = products.data.products.edges
        // console.log(productsArray)
      const container = document.getElementById("products-container");
      productsArray.forEach((product) => {
        const card = document.createElement("div");
        card.className = "product-card";
        card.innerHTML = `
      <img src="${product.node.images.edges[0]?.node.url}" alt="${product.node.title}" />
      <h3>${product.node.title}</h3>
      <p>₹${product.node.variants.edges[0].node.price.amount}</p>
     
    `
      const buyNow = document.createElement("button")
      buyNow.classList.add("buyNowBtn")
      buyNow.setAttribute("target", product.node.variants.edges[0].node.id)
      buyNow.textContent= "Buy Now";

     buyNow.addEventListener("click", (e)=>{
      console.log("Buy Now button clicked")
      const id = e.currentTarget.getAttribute("target")
      createCart(id).then((checkoutUrl) => {
  window.location.href = checkoutUrl;
});

    })
        card.appendChild(buyNow);
        container.appendChild(card);
      });
    })
    .catch((err) => console.error("Failed to load products:", err));
}

async function createCart(merchandiseId, quantity = 1) {
  const res = await fetch("http://localhost:8001/shopify/create-cart", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ merchandiseId, quantity }),
  });

  const data = await res.json();
  return data.checkoutUrl;
}




