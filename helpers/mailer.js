const User = require('../Model/userModel');
const bcryptjs = require('bcryptjs');
const nodemailer = require('nodemailer');

const sendEmail = async ({ email, emailtype, userId }) => {
    try {
        const hashedToken = await bcryptjs.hash(userId.toString(), 10);

        if (emailtype === 'VERIFY') {
            await User.findOneAndUpdate(
                { _id: userId },
                {
                    $set: {
                        verifyToken: hashedToken,
                        verifyTokenExpiry: Date.now() + 3600000
                    }
                }
            );
            console.log("User updated for Verify");
        } else if (emailtype === "RESET") {
            await User.findOneAndUpdate(
                { _id: userId },
                {
                    $set: {
                        forgotPasswordToken: hashedToken,
                        forgotPasswordTokenExpiry: Date.now() + 3600000
                    }
                }
            );
            console.log("User updated for Reset");
        }

        const transport = nodemailer.createTransport({
            host: "sandbox.smtp.mailtrap.io",
            port: 2525,
            auth: {
                user: "143a0fdd27c1a9",
                pass: "33b47aab8b01a3"
            }
        });

        const mailOptions = {
            from: 'Vikas@gmail.com',
            to: email,
            subject: emailtype === "VERIFY" ? "Verify your email" : "Reset your password",
            html: `<p>Click <a href="http://localhost:5173/verify?token=${hashedToken}">here</a> to ${emailtype === "VERIFY" ? "verify your email" : "reset your password"}
            or copy and paste the link below in your browser. <br> http://localhost:5173/verify?token=${hashedToken}
            </p>`
        };

        const mailResponse = await transport.sendMail(mailOptions);
        return mailResponse;
    } catch (error) {
        console.error("Error sending email:", error);
        throw new Error("Failed to send email");
    }
};

module.exports = sendEmail;
