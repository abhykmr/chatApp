const UserModel = require("../models/userModel");

const checkEmail = async (req, res) => {
  try {
    const { email } = req.body;

    const checkEmail = await UserModel.findOne({ email }).select("-password");

    if (!checkEmail) {
      res.status(400).json({
        message: "User does not exit",
        success: false,
      });
    }

    res.status(200).json({
      success: true,
      data: checkEmail,
    });
  } catch (error) {}
};

module.exports = checkEmail;
