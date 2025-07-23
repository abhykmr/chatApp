const UserModel = require("../models/userModel");
const bcryptjs = require("bcryptjs");

const registerUsesr = async (req, res) => {
  try {
    const { name, email, password, profilePic } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({
        message: "All fields are required!",
      });
    }

    const userExit = await UserModel.findOne({ email });
    if (userExit) {
      return res.status(400).json({
        message: "User already exits, try with different email!",
      });
    }

    // hashing the password before storing in the database
    const salt = await bcryptjs.genSalt(10);
    const hashedPassword = await bcryptjs.hash(password, salt);

    const payload = {
      name,
      email,
      password: hashedPassword,
      profilePic,
    };

    const user = new UserModel(payload);
    const newUser = await user.save();

    if (!newUser) {
      res.status(400).json({
        message: "An error occured, while creating! try again letter",
      });
    }

    res.status(201).json({
      message: "User created successfully!",
      success: true,
      user: newUser,
    });
  } catch (error) {
    return res.status(500).json({
      err: error.message || error,
      error: true,
    });
  }
};

module.exports = registerUsesr;
