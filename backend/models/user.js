const mongoose = require("mongoose")

const userSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    phoneNumber: {
        type: String,
        required: true
    },
    otp: {
        type: String,
        default: null
    },
    cart: [{
        productId: {
            type: String,
            required: true
        },
        variantId: {
            type: String,
            required: true
        },
        quantity: {
            type: Number,
            required: true,
            min: 1
        }
    }],
    wishlist: [{
        productId: {
            type: String,
            required: true
        },
    }],
    token: {
    type: String,
    required: false,
    default: "",
  },
});

const User = mongoose.model("user", userSchema);

module.exports = User;