module.exports.logout = async (req, res) => {
    try {
        // Validation: Check if token cookie exists
        if (!req.cookies.token) {
            return res.status(400).json({ error: "No token found" });
        }

        // Clear the token cookie
        res.clearCookie("token");

        // Respond with success message
        return res.status(200).json({
            message: "Logout Successfully",
            success: true
        });
    } catch (error) {
        return res.status(500).json({
            error: error.message
        });
    }
};

