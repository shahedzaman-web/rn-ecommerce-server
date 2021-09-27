const express = require("express");
const router = express.Router();

//Internal imports
const { login, register } = require("./../controller/userController");

const { upload } = require("./../utils/cloudinary");

// Admin Register Route =>post
router.route("/register").post(upload.single("image"), register);

// Admin Login Route =>post
router.route("/login").post(login);

//export router

module.exports = router;
