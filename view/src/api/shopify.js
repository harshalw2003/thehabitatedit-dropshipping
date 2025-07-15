
export async function fetchProducts() {
  const endpoint = `http://34.44.209.117:8001/shopify/products/`;

  const res = await fetch(endpoint, {
    method: "POST",
  });

  const data = await res.json();
  console.log("Data from Api Call",data)
  return data;
};

export async function createCart(merchandiseId, quantity = 1) {
  const res = await fetch("http://34.44.209.117:8001/shopify/create-cart", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ merchandiseId, quantity }),
  });

  const data = await res.json();
  return data.checkoutUrl;
}

