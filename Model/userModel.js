const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    
    username: {
        type: String,
        required: [true, "Please Provide a Username"]
    },
    email: {
        type: String,
        required: [true, "Please Provide an Email"],
        unique: true
    },
    password: {
        type: String,
        required: [true, "Please Provide a Password"],
    },
    isVerified: {
        type: Boolean,
        default: false
    },
    isAdmin: {
        type: Boolean,
        default: false
    },
    forgotPasswordToken: String,
    forgotPasswordTokenExpiry: Date,
    verifyToken: String,
    verifyTokenExpiry: Date
});

const User = mongoose.model("User", userSchema);

module.exports = User;