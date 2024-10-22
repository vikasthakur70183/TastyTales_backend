const Recipe = require('../../../Model/savedRecipe');
const User = require('../../../Model/userModel');

module.exports.saveRecipe = async (req, res) => {
    try {
        const { email, mealid } = req.body; // Destructuring request body
        console.log(email,mealid);
        // Validation: Check if email and mealid are provided
        if (!email || !mealid) {
            return res.status(400).json({ error: "Email and mealid are required" });
        }

        // Check if the user already exists
        const existingUser = await User.findOne({ email });
        if (!existingUser) {
            return res.status(400).json({ error: "User doesn't exist" });
        }

        // Find the existing recipe for the user
        let savedRecipe = await Recipe.findOne({ email });

        // If no existing recipe found, create a new one
        if (!savedRecipe) {
            savedRecipe = new Recipe({
                email,
                mealid: [mealid] // Create a new array with the first mealid
            });
        } else {
            // Check if the mealid already exists
            if (savedRecipe.mealid.includes(mealid)) {
                return res.status(400).json({ error: "Meal ID already exists for this user" });
            }
            // If existing recipe found, push the new mealid into the mealid array
            savedRecipe.mealid.push(mealid);
        }

        // Save the updated recipe to the database
        const saved = await savedRecipe.save();

        // Respond with success message
        return res.status(200).json({
            success: true,
            message: "Recipe saved successfully",
            savedRecipe
        });
    } catch (error) {
        console.error(error); // Log the error for debugging
        return res.status(500).json({ error: "Internal Server Error" }); // Send a generic error message
    }
};
