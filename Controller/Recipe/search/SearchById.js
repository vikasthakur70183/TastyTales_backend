const axios = require("axios");

module.exports.SearchById = async (req, res) => {
    try {
        const { id } = req.body; // Assuming the ID is sent as part of the request body
        const url = `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`;
        
        const response = await axios.get(url);
        
        if (response.data.meals) {
            console.log(response.data.meals);
            return res.status(200).json(response.data.meals);
        } else {
            return res.status(404).json({ message: "Meal not found" });
        }
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: error.message });
    }
};
