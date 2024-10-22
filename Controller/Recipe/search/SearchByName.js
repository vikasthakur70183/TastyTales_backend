const axios = require("axios");

module.exports.SearchByName = async (req, res) => {
    try {
        const { name } = req.body;
        const url = `https://www.themealdb.com/api/json/v1/1/search.php?s=${name}`;

        const response = await axios.get(url);
        if (response.data.meals) {
            return res.status(200).json(response.data.meals);
        } else {
            return res.status(404).json({ message: "Meals not found" });
        }
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: error.message });
    }
};
