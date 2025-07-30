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

export async function fetchProductById(productHandle){
  const endpoint = `http://${ip}:8001/shopify/product/${productHandle}`;

  try {
    const res = await fetch(endpoint, {
      method: "POST",
    });

    const data = await res.json();
    return data.product;
  } catch (error) {
    console.error("Error fetching product:", error);
    return null;
  }
};

export async function createCart(productId, variantId, quantity = 1) {
  try {
    const res = await fetch(`http://${ip}:8001/shopify/create-cart`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ productId, variantId, quantity }),
    });

    const data = await res.json();
    return data.checkoutUrl;
  } catch (error) {
    console.error("Error creating cart:", error);
    throw error;
  }
}

export async function addToCart(productHandle, productId, variantId, quantity = 1) {
  try {
    const res = await fetch(`http://${ip}:8001/user/add-to-cart`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        'Authorization': `Bearer ${localStorage.getItem('authToken')}`
      },
      body: JSON.stringify({ productHandle, productId, variantId, quantity }),
    });

    const data = await res.json();
    // console.log(data.message);
    return data.success;
  } catch (error) {
    console.error("Error creating cart:", error);
    throw error;
  }
}

export async function addToWishlist(productHandle) {
  try {
    const res = await fetch(`http://${ip}:8001/user/add-to-wishlist`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        'Authorization': `Bearer ${localStorage.getItem('authToken')}`
      },
      body: JSON.stringify({ productHandle }),
    });

    const data = await res.json();
    console.log(data.message);
    
    // Update local storage with the new wishlist if provided
    if (data.success && data.wishlist) {
      const wishlistHandles = data.wishlist.map(item => item.productHandle);
      localStorage.setItem('wishlist', JSON.stringify(wishlistHandles));
    }
    
    return data.success;
  } catch (error) {
    console.error("Error adding to wishlist:", error);
    throw error;
  }
}

export async function removeFromWishlist(productHandle) {
  try {
    const res = await fetch(`http://${ip}:8001/user/remove-from-wishlist`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        'Authorization': `Bearer ${localStorage.getItem('authToken')}`
      },
      body: JSON.stringify({ productHandle }),
    });

    const data = await res.json();
    
    // Update local storage with the new wishlist if provided
    if (data.success && data.wishlist) {
      const wishlistHandles = data.wishlist.map(item => item.productHandle);
      localStorage.setItem('wishlist', JSON.stringify(wishlistHandles));
    }
    
    return data.success;
  } catch (error) {
    console.error("Error removing from wishlist:", error);
    throw error;
  }
}

export async function getWishlist() {
  try {
    const res = await fetch(`http://${ip}:8001/user/get-wishlist`, {
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('authToken')}`
      },
    });

    const data = await res.json();
    if (data.success && data.wishlist) {
      // Map to just extract the product handles
      return data.wishlist;
    } else {
      return [];
    }
  } catch (error) {
    console.error("Error getting wishlist:", error);
    throw error;
  }
}

export async function getCart() {
  try {
    const res = await fetch(`http://${ip}:8001/user/cart`, {
      method: "POST",
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('authToken')}`
      }
    });

    const data = await res.json();
    return data.success ? data.cart : [];
  } catch (error) {
    console.error("Error getting cart:", error);
    throw error;
  }
}

export async function updateCartItemQuantity(productId, variantId, quantity) {
  try {
    const res = await fetch(`http://${ip}:8001/user/update-cart-quantity`, {
      method: "POST",
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('authToken')}`
      },
      body: JSON.stringify({ productId, variantId, quantity }),
    });

    const data = await res.json();
    return data.success ? data.cart : [];
  } catch (error) {
    console.error("Error updating cart quantity:", error);
    throw error;
  }
}

export async function removeFromCart(productId, variantId) {
  try {
    const res = await fetch(`http://${ip}:8001/user/remove-from-cart`, {
      method: "POST",
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('authToken')}`
      },
      body: JSON.stringify({ productId, variantId }),
    });

    const data = await res.json();
    return data.success ? data.cart : [];
  } catch (error) {
    console.error("Error removing from cart:", error);
    throw error;
  }
}

