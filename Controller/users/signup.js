const User = require('../../Model/userModel');
const bcryptjs = require('bcryptjs');
const sendEmail = require('../../helpers/mailer');

module.exports.registerNewUser = async (req, res) => {
    try {
        const { username, email, password,confirm_password} = req.body; // Destructuring request body

        // Validation: Check if username, email, and password are provided
        if (!username || !email || !password) {
            return res.status(400).json({ error: "Username, email, and password are required" });
        }

        // Check if the user already exists
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ error: "User already exists" });
        }

        // Hash the password
        const salt = await bcryptjs.genSalt(10);
        const hashedPassword = await bcryptjs.hash(password, salt);

        // Create a new user object
        const newUser = new User({
            username,
            email,
            password: hashedPassword
        });

        // Save the new user to the database
        const savedUser = await newUser.save();

        // Send verification mail
        // await sendEmail({ email, emailtype: "VERIFY", userId: savedUser._id });

        // Respond with success message
        return res.status(200).json({
            success: true,
            message: "User registered successfully",
            savedUser
        });
    } catch (error) {
        console.error(error); // Log the error for debugging
        return res.status(500).json({ error: "Internal Server Error" }); // Send a generic error message
    }
};
