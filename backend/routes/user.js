const express = require("express");
const accountSid = "AC67e2ad371d0914db9faa2b7b8aa2e1cf";
const authToken = "0dc2a801ec288023c09b29042963668f";
const twilioClient = require("twilio")(accountSid, authToken);
const mongoose = require("mongoose");
const User = require("../models/user.js");
// const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken")
const dotenv = require('dotenv');
const authenticate = require('../middleware/auth.js');
// const cookieParser = require('cookie-parser');

dotenv.config();

const router = express.Router();

router.post("/update-cart-quantity", authenticate.authenticateToken, async (req, res) => {
  try {
    const { productId, variantId, quantity } = req.body;
    // // console.log("Updating cart quantity for user:", req.user._id);
    
    if (!quantity || quantity < 1) {
      return res.status(400).json({ success: false, message: "Invalid quantity" });
    }
    
    const user = await User.findById(req.user._id);
    if (!user) {
      return res.status(404).json({ success: false, message: "User not found" });
    }
    
    // Find the item in the cart and update quantity
    const cartItem = user.cart.find(item => 
      item.productId === productId && item.variantId === variantId
    );
    
    if (!cartItem) {
      return res.status(404).json({ success: false, message: "Item not found in cart" });
    }
    
    cartItem.quantity = quantity;
    await user.save();
    
    // // console.log("Updated user cart:", user.cart);
    res.status(200).json({ success: true, message: "Cart quantity updated", cart: user.cart });
  } catch (error) {
    console.error("Error updating cart quantity:", error.message);
    res.status(500).json({ success: false, error: error.message });
  }
});

router.post("/remove-from-cart", authenticate.authenticateToken, async (req, res) => {
  try {
    const { productId, variantId } = req.body;
    // // console.log("Removing item from cart for user:", req.user._id);
    const user = await User.findById(req.user._id);
    if (!user) {
      return res.status(404).json({ success: false, message: "User not found" });
    }
    user.cart = user.cart.filter(item => item.productId !== productId || item.variantId !== variantId);
    await user.save();
    // // console.log("Updated user cart:", user.cart);
    res.status(200).json({ success: true, message: "Product removed from cart", cart: user.cart });
  } catch (error) {
    console.error("Error removing from cart:", error.message);
    res.status(500).json({ success: false, error: error.message });
  }
});


function generateOTP() {
  return Math.floor(100000 + Math.random() * 900000).toString();
}

router.post("/send-otp", async (req, res) => {
  const { phoneNumber } = req.body;
  // console.log("Phone number received:", phoneNumber);

  if (!phoneNumber)
    return res
      .status(400)
      .json({ success: false, message: "Phone number required" });

  const otp = generateOTP();

  try {
    // const message = await twilioClient.messages.create({
    //   from: "whatsapp:+14155238886",
    //   contentSid: "HX229f5a04fd0510ce1b071852155d3e75",
    //   contentVariables: `{"1":"${otp}"}`,
    //   to: `whatsapp:+91${phoneNumber}`,
    //   //   body: `Your OTP is: ${otp}`
    // });
    const message = await twilioClient.messages.create({
      body: `Your verification code to login in to T H E is ${otp}`,
      from: '+12513250217',
      to: `+91${phoneNumber}`
    });
    
    const userExists = await User.findOne({ phoneNumber: `+91${phoneNumber}` });
    // console.log("User exists:", userExists);
    if (userExists) {
        // console.log("User exists, updating OTP");
        // console.log("Previous OTP:", userExists.otp);
        userExists.otp = otp;
        await userExists.save();
        // console.log("Updated OTP:", userExists.otp);
    }else{
        // console.log("User does not exist, creating new user");
        const newUser = new User({
          firstName: req.body.firstName,
          lastName: req.body.lastName,
          phoneNumber: `+91${phoneNumber}`,
          otp: otp
        });
        await newUser.save();
        // console.log("New user created with OTP:", newUser.otp);
    }

    // console.log("OTP sent Successfully:", otp);
      res.status(200).json({ success: true });
  } catch (error) {
    console.error("Error sending OTP:", error.message);
    res.status(500).json({ success: false, error: error.message });
  }
});

router.post("/verify-otp", async (req, res) => {
  try {
    let { phoneNumber, otp } = req.body;

    // console.log("Verifying OTP for phone number:", phoneNumber);
    phoneNumber = `+91${phoneNumber}`;
    const user = await User.findOne({ phoneNumber: phoneNumber });
    // console.log("User found:", user);
    
    if (!user) {
      return res.status(404).json({ success: false, message: "User not found" });
    }
    
    // console.log("Stored OTP:", user.otp);
    // console.log("Provided OTP:", otp);

    if (user.otp === otp) {
        const userPayLoad = {
          id: user._id,
          phoneNumber: user.phoneNumber
        };
        const token = jwt.sign(userPayLoad, process.env.JWT_SECRET_KEY)
        // console.log("Generated token:", token);

        
      const updatedUser = await User.findOneAndUpdate(
        { phoneNumber: phoneNumber }, 
        { 
          otp: null,
          token: token 
        },
        { new: true }
      );
      // console.log("OTP verified and cleared for:", phoneNumber);
      // console.log("Updated user OTP:", updatedUser.otp);
      // console.log("Updated user token:", updatedUser.token);
      return res.status(200).json({ success: true, token: token, message: "OTP verified" });
    } else {
      return res.status(400).json({ success: false, message: "Invalid OTP" });
    }
  } catch (error) {
    console.error("Error verifying OTP:", error.message);
    res.status(500).json({ success: false, error: error.message });
  }
});

router.get('/authenticate', authenticate.authenticateToken, async (req, res) => {
  // console.log("User authenticated:", req.user);
  res.status(200).json({ success: true, user: req.user });
});

router.post("/logout", authenticate.authenticateToken , async (req, res) => {

  // console.log("User logout API hit")
  // res.clearCookie('token');
  // console.log(req.user)
  if (req.user) {
    const user = await User.findByIdAndUpdate(req.user._id, { token: "" })
    res.json({
      success: true,
      message: "User logged out successfully"
    })
  } else {
    res.json({
      success: false,
      message: "User Already logged out",
    })
  }
})

router.post("/cart", authenticate.authenticateToken, async (req, res) => {

  try {
    // console.log("Fetching cart for user:", req.user._id);
    const user = await User.findById(req.user._id).select('cart');
    if (!user) {
      return res.status(404).json({ success: false, message: "User not found" });
    }
    // console.log("User cart:", user.cart);
    res.status(200).json({ success: true, cart: user.cart });
  } catch (error) {
    console.error("Error fetching cart:", error.message);
    res.status(500).json({ success: false, error: error.message });
  }
})

router.post("/add-to-cart", authenticate.authenticateToken, async (req, res) => {
  try {
    const { productHandle, productId, variantId, quantity } = req.body;
    // console.log(productHandle)
    // console.log("Adding item to cart for user:", req.user._id);
    const user = await User.findById(req.user._id);
    if (!user) {
      return res.status(404).json({ success: false, message: "User not found" });
    }
    user.cart.push({ productHandle: productHandle, productId: productId, variantId: variantId, quantity: quantity });
    await user.save();
    // console.log("Product added to user cart:", user.cart);
    res.status(200).json({ success: true, cart: user.cart });
  } catch (error) {
    console.error("Error adding to cart:", error.message);
    res.status(500).json({ success: false, error: error.message });
  }
});

// Get user's wishlist
router.get("/get-wishlist", authenticate.authenticateToken, async (req, res) => {
  try {
    const user = await User.findById(req.user._id);
    if (!user) {
      return res.status(404).json({ success: false, message: "User not found" });
    }
    
    res.status(200).json({ 
      success: true, 
      message: "Wishlist retrieved successfully", 
      wishlist: user.wishlist 
    });
  } catch (error) {
    console.error("Error retrieving wishlist:", error.message);
    res.status(500).json({ success: false, message: "Server error retrieving wishlist" });
  }
});

router.post("/add-to-wishlist", authenticate.authenticateToken, async (req, res) => {
  try {
    const { productHandle } = req.body;
    // console.log("=== ADD TO WISHLIST DEBUG ===");
    // console.log("Adding item to wishlist for user:", req.user._id);
    // console.log("Product handle:", productHandle);
    // console.log("Product handle type:", typeof productHandle);
    // console.log("Product handle length:", productHandle ? productHandle.length : 'undefined/null');
    // console.log("Request body:", req.body);
    // // console.log("Request headers:", req.headers);
    
    // Validate productHandle
    if (!productHandle || productHandle.trim() === '') {
      // console.log("❌ Product handle validation failed");
      return res.status(400).json({ 
        success: false, 
        message: "Product handle is required and cannot be empty" 
      });
    }
    
    // console.log("✅ Product handle validation passed");
    
    const user = await User.findById(req.user._id);
    // console.log("User found:", !!user);
    // console.log("User ID:", user ? user._id : 'null');
    // console.log("Current wishlist length:", user ? user.wishlist.length : 'null');
    
    if (!user) {
      return res.status(404).json({ success: false, message: "User not found" });
    }
    
    // Check if product already exists in wishlist
    const productExists = user.wishlist.some(item => item.productHandle === productHandle);
    // console.log("Product already exists in wishlist:", productExists);
    
    if (productExists) {
      // console.log("Product already in wishlist");
      return res.status(200).json({ success: true, message: "Product already in wishlist", wishlist: user.wishlist });
    }
    
    // Add to wishlist only if it doesn't exist
    // console.log("About to push to wishlist:", { productHandle: productHandle });
    user.wishlist.push({ productHandle: productHandle });
    
    // console.log("Wishlist after push, before save:", user.wishlist);
    // console.log("About to save user...");
    
    await user.save();
    
    // console.log("✅ User saved successfully");
    // console.log("Final wishlist:", user.wishlist);
    // console.log("=== END DEBUG ===");
    
    res.status(200).json({ success: true, message: "Product added to wishlist", wishlist: user.wishlist });
  } catch (error) {
    console.error("❌ Error adding to wishlist:", error.message);
    console.error("Error stack:", error.stack);
    console.error("Error details:", error);
    res.status(500).json({ success: false, error: error.message });
  }
});

router.post("/remove-from-wishlist", authenticate.authenticateToken, async (req, res) => {
  try {
    const { productHandle } = req.body;
    // console.log("Removing item from wishlist for user:", req.user._id);
    const user = await User.findById(req.user._id);
    if (!user) {
      return res.status(404).json({ success: false, message: "User not found" });
    }
    user.wishlist = user.wishlist.filter(item => item.productHandle !== productHandle);
    await user.save();
    // console.log("Updated user wishlist:", user.wishlist);
    res.status(200).json({ success: true, message: "Product removed from wishlist", wishlist: user.wishlist });
  } catch (error) {
    console.error("Error removing from wishlist:", error.message);
    res.status(500).json({ success: false, error: error.message });
  }
});





module.exports = router;
