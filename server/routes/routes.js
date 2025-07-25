const express = require("express");

const registerUser = require("../controllers/registerUser");
const checkEmail = require("../controllers/checkEmail");
const checkPassword = require("../controllers/checkPassword");

const router = express.Router();

// api paths
router.post("/registerUser", registerUser);
router.post("/checkEmail", checkEmail);
router.post("/checkPassword", checkPassword);

module.exports = router;
