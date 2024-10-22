const User = require('../../Model/userModel');

module.exports.verify = async (req, res) => {
    try {
        const { token } = req.body; // Extract token from request body

        // Validation: Check if token is provided
        if (!token) {
            return res.status(400).json({ error: "Token is required" });
        }

        // Find user by token and check if token is not expired
        const user = await User.findOne({
            verifyToken: token,
            verifyTokenExpiry: { $gt: Date.now() } // Check if token is not expired
        });

        // Validation: Check if user exists with the provided token and token is not expired
        if (!user) {
            return res.status(400).json({ error: "Invalid token or token expired" });
        }

        // Update user properties
        user.isVerified = true;
        user.verifyToken = undefined;
        user.verifyTokenExpiry = undefined;

        // Save the user
        await user.save();

        return res.status(200).json({
            message: "Email verified successfully",
            success: true
        });
    } catch (error) {
        return res.status(500).json({
            error: error.message
        });
    }
};
