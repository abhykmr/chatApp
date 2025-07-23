const express = require("express");

const registerUser = require("../controllers/registerUser");
const checkEmail = require("../controllers/checkEmail");

const router = express.Router();

// api paths
router.post("/registerUser", registerUser);
router.post("/checkEmail", checkEmail);

module.exports = router;
