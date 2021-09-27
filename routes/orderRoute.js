const express = require("express");
const router = express.Router();

//Internal imports
const { placeOrder } = require("./../controller/orderController");

// Create a new orderRoute =>post
router.route("/place-order").post(placeOrder);

//export router

module.exports = router;
