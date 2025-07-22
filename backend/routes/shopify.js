const express = require("express");
const STOREFRONT_ACCESS_TOKEN = "56f906961bd692bea09127012bab9f9e";
const STORE_DOMAIN = "https://ftap1q-bh.myshopify.com/";

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
            variants(first: 1) {
              edges {
                node {
                  id
                  price {
                    amount
                  }
                }
              }
            }
              collections(first: 3) {
  edges {
    node {
      id
      title
      handle
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
    res.json(data);
  } else {
    res.json({
      message: "Error calling api",
    });
  }
});

router.post("/create-cart", async (req, res) => {
  const { merchandiseId, quantity } = req.body;
  console.log(req.body);
  const query = `
    mutation {
      cartCreate(input: {
        lines: [
          {
            quantity: ${quantity}
            merchandiseId: "${merchandiseId}"
          }
        ]
      }) {
        cart {
          id
          checkoutUrl
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
    console.log("Cart response:", JSON.stringify(data));
    const checkoutUrl = data.data.cartCreate.cart.checkoutUrl;
    console.log(checkoutUrl);
    res.json({ checkoutUrl });
  } catch (error) {
    console.error("Cart create failed:", error.response?.data || error.message);
    res.status(500).json({ error: "Failed to create cart" });
  }
});

router.post("/product/:id", async (req, res) => {
  console.log("Fetching product details for ID:", req.params.id);
  const id = `gid://shopify/Product/${req.params.id}`;

  if (!id) {
    return res.status(400).json({ error: "Error fetching id of the product" });
  }

  const query = `
    query getProductById($id: ID!) {
      node(id: $id) {
        ... on Product {
          id
          title
          description
          productType
          handle
          tags
          availableForSale
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
            collections(first: 3) {
  edges {
    node {
      id
      title
      handle
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
      body: JSON.stringify({ query, variables: { id } }),
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
