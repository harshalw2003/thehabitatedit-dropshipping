const express = require("express")
const STOREFRONT_ACCESS_TOKEN = "56f906961bd692bea09127012bab9f9e"
const STORE_DOMAIN = "https://ftap1q-bh.myshopify.com/"

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
      "X-Shopify-Storefront-Access-Token": `${STOREFRONT_ACCESS_TOKEN}`
    },
    body: JSON.stringify({ query })
  });

  const data = await response.json();
  if(data){
    res.json(data);
  }else{
    res.json({
        message:"Error calling api"
    })
  }
});


router.post("/create-cart", async (req, res) => {

  const { merchandiseId, quantity } = req.body;
  console.log(req.body)
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
    const response = await fetch(`${STORE_DOMAIN}/api/2023-10/graphql.json`,{
       method: "POST",
        headers: {
          "Content-Type": "application/json",
          "X-Shopify-Storefront-Access-Token": STOREFRONT_ACCESS_TOKEN,
        },
         body: JSON.stringify({ query })
      });
      const data = await response.json()
      console.log("Cart response:", JSON.stringify(data));
    const checkoutUrl = data.data.cartCreate.cart.checkoutUrl;
    console.log(checkoutUrl)
    res.json({ checkoutUrl });
  } catch (error) {
    console.error("Cart create failed:", error.response?.data || error.message);
    res.status(500).json({ error: "Failed to create cart" });
  }
});

module.exports = router;


