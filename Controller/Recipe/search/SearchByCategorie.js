const axios = require("axios");
const { isAuth } = require("../../users/auth");

module.exports.SearchByCategorie = async (req, res) => {
    try {
        const { category } = req.body; // Assuming the ID is sent as part of the request body
        console.log(category);
        const url = `https://www.themealdb.com/api/json/v1/1/filter.php?c=${category}`;
        
        const response = await axios.get(url);
        if (response.data.meals) {
            // console.log(response.data.meals);
            return res.status(200).json(response.data.meals);
        } else {
            return res.status(404).json({ message: "Meals not found" });
        }
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: error.message });
    }
};
