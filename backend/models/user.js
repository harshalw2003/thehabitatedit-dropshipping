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
    email: {
        type: String,
        required: false,
        default: ""
    },
    otp: {
        type: String,
        default: null
    },
    cart: [{
        productHandle : {
            type: String,
            required: true

        },
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
        productHandle: {
            type: String,
            required: [true, 'Product handle is required for wishlist items'],
            trim: true,
            minlength: [1, 'Product handle cannot be empty']
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