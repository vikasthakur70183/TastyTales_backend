const jwt = require('jsonwebtoken');

// Function to extract user ID from JWT token stored in a cookie
exports.getDataFromToken = (req) => {
    try {
        // Access token from the "token" cookie
        const token = req.cookies.token || '';
        console.log(token);
        // Verify token and extract data
        const decodedToken = jwt.verify(token, 'vikas');
        console.log(decodedToken);
        // Return user ID extracted from token
        return decodedToken.id;
    } catch (error) {
        // Handle verification errors gracefully
        console.error('Token verification error:', error.message);
        return null; // Return null or any default value when token is invalid
    }
};
