
export default async function fetchProducts() {
  const endpoint = `http://localhost:8001/shopify/products/`;

  const res = await fetch(endpoint, {
    method: "POST",
  });

  const data = await res.json();
  console.log("Data from Api Call",data)
  return data;
};

