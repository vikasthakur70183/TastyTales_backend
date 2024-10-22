const SavedRecipe = require('../../../Model/savedRecipe');
const User = require('../../../Model/userModel');

module.exports.getallsaveRecipe = async (req, res) => {
    try {
        const { email } = req.body; // Destructuring request body
        
        if (!email) {
            return res.status(400).json({ error: "Email is required" });
        }

        // Check if the user already exists
        const existingUser = await User.findOne({ email });
        if (!existingUser) {
            return res.status(400).json({ error: "User doesn't exist" });
        }

        // Find saved recipes for the user
        const savedRecipes = await SavedRecipe.findOne({ email });

        if (!savedRecipes) {
            return res.status(400).json({ error: "No saved recipes found" });
        }

        // Extract mealid array from savedRecipes
        const { mealid } = savedRecipes;

        // Respond with success message and mealid array
        return res.status(200).json({
            success: true,
            message: "Saved recipes fetched successfully",
            savedRecipes: mealid
        });
    } catch (error) {
        console.error(error); // Log the error for debugging
        return res.status(500).json({ error: "Internal Server Error" }); // Send a generic error message
    }
};
