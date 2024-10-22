const User = require('../../Model/userModel');
const connect = require('../../config/dbconfig');
const bcryptjs = require('bcryptjs');
const jwt = require('jsonwebtoken');

connect();

module.exports.login = async (req, res) => {
    try {
        const { email, password } = req.body; // Destructure email and password from request body

        // Validation: Check if email and password are provided
        if (!email || !password) {
            return res.status(400).json({ error: "Email and password are required" });
        }

        // Find user by email
        const user = await User.findOne({ email });

        // Validation: Check if user exists
        if (!user) {
            return res.status(400).json({ error: "User does not exist" });
        }

        // Check if password is valid
        const validPassword = await bcryptjs.compare(password, user.password);

        // Validation: Check if password is valid
        if (!validPassword) {
            return res.status(401).json({ error: "Invalid password" });
        }

        // Generate JWT token
        const tokenData = {
            username: user.username,
            email: user.email
        };

        // Sign the token with the provided secret key and set expiration time
        const token = jwt.sign(tokenData, process.env.TOKEN_SECRET , { expiresIn: '1d' });

        // Set token in cookie
        res.cookie("token", token, {
            httpOnly: false
            // Add other cookie options if needed
        });

        // Respond with success message
        return res.status(200).json({
            message: "Logged In Successfully",
            success: true   
        });
    } catch (error) {
        // Handle errors
        console.error("Login error:", error);
        return res.status(500).json({
            error: "Internal Server Error"
        });
    }
};
