const UserModel = require("../models/userModel");
const bcryptjs = require("bcryptjs");
const jwt = require("jsonwebtoken");

const checkPassword = async (req, res) => {
  try {
    const { password, userId } = req.body;

    const user = await UserModel.findById(userId);

    // Use a generic error message to prevent user enumeration
    if (!user) {
      return res.status(400).json({
        message: "Invalid credentials", // More secure message
        success: false,
      });
    }

    const verifyPassword = await bcryptjs.compare(password, user.password);

    if (!verifyPassword) {
      return res.status(400).json({
        message: "Invalid credentials", // More secure message
        success: false,
      });
    }

    const payload = {
      id: user._id,
      name: user.name,
    };

    const token = jwt.sign(payload, process.env.SECRET, { expiresIn: "1d" });

    const cookieOptions = {
      httpOnly: true, // CORRECT: Prevents JS access, mitigating XSS
      secure: process.env.NODE_ENV === "production", // Use secure cookies in production
    };

    return (
      res
        // CORRECT: Set cookie with name 'token', value, and options
        .cookie("token", token, cookieOptions)
        .status(200)
        .json({
          success: true,
          message: "Login Successful!",
          // Optional: The token is in the httpOnly cookie, so sending it in the body is often not needed for web apps.
          // user: payload
        })
    );
  } catch (error) {
    res.status(500).json({
      message: error.message || error,
      error: true,
    });
  }
};

module.exports = checkPassword;
