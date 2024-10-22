const User = require('../../Model/userModel');
const jwt = require('jsonwebtoken');

module.exports.isAuth= async (req,res,next)=>{
    try {
        const token = req.headers?.authorization;

        // Validation: Check if token exists
        if(!token) {
            return res.status(400).json({ error: "Token not provided" });
        }

        // Validation: Check if token is in the correct format
        const jwtToken = token.split("Bearer ")[1];
        if (!jwtToken) {
            return res.status(400).json({ error: "Invalid token format" });
        }

        // Validation: Verify JWT token
        const decoded = jwt.verify(jwtToken, 'vikas');
        console.log(decoded);
        // Extract user ID from decoded token
        const { userId } = decoded;
        // Validation: Check if user exists
        const user = await User.findById(userId);
        if (!user) {
            return res.status(400).json({ error: "Unauthorized access!" });
        }

        // Attach user object to request for further processing
        req.user = user;
        next();
    } catch (error) {
        // Handle token verification errors
        console.error("Token verification error:", error);
        return res.status(500).json({ error: "Internal server error" });
    }
};
