const mongoose = require('mongoose');

const SavedRecipeSchema = new mongoose.Schema({
    email: {
        type: String,
        required: [true, "Please Provide an Email"],
        unique: true
    },
    mealid: {
        type: [String], // Define mealid as an array of strings
        required: true,
        default: [] // Default value is an empty array
    }
});

const SavedRecipe = mongoose.model("recipe", SavedRecipeSchema);

module.exports = SavedRecipe;
