const User = require('../../Model/userModel');
const token = require('../../helpers/getDataFromToken');

module.exports.profile = async (req, res) => {
    try { 
        // Get userId from token
        const userId = await token.getDataFromToken(req);

        // Validation: Check if userId is available
        if (!userId) {
            return res.status(401).json({ error: 'Unauthorized' });
        }

        // Retrieve user profile information from the database
        const user = await User.findById(userId).select("-password");

        // Validation: Check if user exists
        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }

        // Respond with user profile information
        return res.json({ user });
    } catch (error) {
        // Handle errors
        console.error('Profile retrieval error:', error.message);
        return res.status(500).json({ error: 'Internal Server Error' });
    }
};
