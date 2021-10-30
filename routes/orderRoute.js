const express = require("express");
const router = express.Router();

//Internal imports
const { placeOrder,getOrder } = require("./../controller/orderController");

//get orderRoute=>get
router.route("/all-order").get(getOrder);

// Create a new orderRoute =>post
router.route("/place-order").post(placeOrder);

//export router
module.exports = router;
