const express = require("express");
const STOREFRONT_ACCESS_TOKEN = "56f906961bd692bea09127012bab9f9e";
const STORE_DOMAIN = "https://ftap1q-bh.myshopify.com/";
const authenticate = require('../middleware/auth.js');


const router = express.Router();

router.post("/products", async (req, res) => {
  const query = `
    {
      products(first: 10) {
        edges {
          node {
            id
            title
            description
            handle
            images(first: 1) {
              edges {
                node {
                  url
                  altText
                }
              }
            }
            variants(first: 5) {
              edges {
                node {
                  id
                  price {
                    amount
                  }
                }
              }
            }
              collections(first: 10) {
        edges {
          node {
            id
            title
            handle
            description
            image {
              url
              altText
            }
          }
        }
      }
              
          }
        }
      }
    }
  `;

  // const query =  "{ products(first: 10) { edges { node { title } } } }"

  const response = await fetch(`${STORE_DOMAIN}/api/2023-10/graphql.json`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "X-Shopify-Storefront-Access-Token": `${STOREFRONT_ACCESS_TOKEN}`,
    },
    body: JSON.stringify({ query }),
  });

  const data = await response.json();
  if (data) {
    // console.log("Products fetched successfully:", JSON.stringify(data));
    res.json(data);
  } else {
    res.json({
      message: "Error calling api",
    });
  }
});



router.post("/create-checkout", authenticate.authenticateToken,   async (req, res) => {
   // items = [{ merchandiseId: "...", quantity: 2 }, ...]
   console.log("Create checkout request hit!");
   console.log(req.user);
   const cartItemsWithDetails = req.user.cart; 
   console.log("cart Items: ", cartItemsWithDetails);
   console.log("cart Length: ", cartItemsWithDetails.length) // Assuming req.user.cart contains the cart items with productId and quantity
  // Build GraphQL lines input dynamically
  let linesInput = [];
  cartItemsWithDetails.forEach((item) => {
    linesInput.push( `{
        merchandiseId: "gid://shopify/ProductVariant/${item.variantId}",
        quantity: ${item.quantity}
      }`);
  });


    console.log("linesInput: ", linesInput);

  const query = `
    mutation {
      cartCreate(input: {
        lines: [${linesInput}]
      }) {
        cart {
          id
          checkoutUrl
          lines(first: 10){
            edges {
              node {
                id
                quantity
                merchandise {
                  ... on ProductVariant {
                    id
                    title
                    product {
                      title
                    }
                  }
                }
              }
            }
          }
        }
        userErrors {
          field
          message
        }
      }
    }
  `;

  try {
    const response = await fetch(`${STORE_DOMAIN}/api/2023-10/graphql.json`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-Shopify-Storefront-Access-Token": STOREFRONT_ACCESS_TOKEN,
      },
      body: JSON.stringify({ query }),
    });

    const data = await response.json();
    console.log("Cart response:", JSON.stringify(data, null, 2));

    const checkoutUrl = data.data.cartCreate.cart.checkoutUrl;
    console.log("Checkout Url: ", checkoutUrl)
    res.json({ checkoutUrl, cart: data.data.cartCreate.cart });
  } catch (error) {
    console.error("Cart create failed:", error.message);
    res.status(500).json({ error: "Failed to create cart" });
  }
  

  try {
    const response = await fetch(`${STORE_DOMAIN}/api/2023-10/graphql.json`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-Shopify-Storefront-Access-Token": STOREFRONT_ACCESS_TOKEN,
      },
      body: JSON.stringify({ query }),
    });

    const data = await response.json();
    console.log("Cart response:", JSON.stringify(data, null, 2));

    const checkoutUrl = data.data.cartCreate.cart.checkoutUrl;
    console.log("Checkout Url: ", checkoutUrl)
    res.json({ checkoutUrl, cart: data.data.cartCreate.cart });
  } catch (error) {
    console.error("Cart create failed:", error.message);
    res.status(500).json({ error: "Failed to create cart" });
  }
});
 



router.post("/product/:id", async (req, res) => {
  console.log("Fetching product details for handle:", req.params.id);
  const handle = req.params.id;

  if (!handle) {
    return res.status(400).json({ error: "Error fetching handle of the product" });
  }

  const query = `
    query getProductByHandle($handle: String!) {
      product(handle: $handle) {
        id
        title
        description
        images(first: 5) {
          edges {
            node {
              url
              altText
            }
          }
        }
        variants(first: 5) {
          edges {
            node {
              id
              title
              price {
                amount
                currencyCode
              }
            }
          }
        }
          collections(first: 5) {
        edges {
          node {
            id
            title
            handle
            description
            image {
              url
              altText
            }
          }
        }
      }
      }
    }
  `;

  try {
    const response = await fetch(`${STORE_DOMAIN}/api/2023-10/graphql.json`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-Shopify-Storefront-Access-Token": STOREFRONT_ACCESS_TOKEN,
      },
      body: JSON.stringify({ query, variables: { handle } }),
    });

    const data = await response.json();

    if (data.errors) {
      console.error("Error fetching product:", data.errors);
      return res.status(500).json({ error: data.errors });
    }
    console.log("Product response:", JSON.stringify(data));
    res.status(200).json(data.data);
  } catch (error) {
    console.error("Error fetching product:", error);
    res.status(500).json({ error: "Something went wrong" });
  }
});

router.get("/collections", async (req, res) => {
  const query = `
    query {
      collections(first: 10) {
        edges {
          node {
            id
            title
            handle
            description
            image {
              url
              altText
            }
          }
        }
      }
    }
  `;

  try {
    const response = await fetch(`${STORE_DOMAIN}/api/2023-10/graphql.json`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-Shopify-Storefront-Access-Token": STOREFRONT_ACCESS_TOKEN,
      },
      body: JSON.stringify({ query }),
    });

    const data = await response.json();

    if (data.errors) {
      console.error("GraphQL Errors:", data.errors);
      return res.status(500).json({ error: data.errors });
    }

    const collections = data.data.collections.edges.map((edge) => edge.node);
    res.status(200).json({ collections });
  } catch (error) {
    console.error("Error fetching collections:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

module.exports = router;
