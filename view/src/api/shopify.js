const ip = "localhost"


export async function fetchProducts(queryParams = '') {
  const endpoint = `http://${ip}:8001/shopify/products/${queryParams}`;

 try{
   const res = await fetch(endpoint, {
    method: "POST",
  });

  const data = await res.json();
  console.log("Data from Api Call",data)
  if(data){
    return data;
  }else{
    return [];
  }

 }catch(err){
  console.log(err.message);
  return [];
 }
};

export async function createCart(merchandiseId, quantity = 1) {
  const res = await fetch(`http://${ip}:8001/shopify/create-cart`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ merchandiseId, quantity }),
  });

  const data = await res.json();
  return data.checkoutUrl;
}

