const express = require("express");
const router = express.Router();

//Internal imports
const {
  createAddress,
  deleteAddress,
} = require("./../controller/addressController");

// Create a new addressRoute =>post
router.route("/create-address").post(createAddress);

//delete address route =>delete
router.route("/delete-address/:id").delete(deleteAddress);

//export router

module.exports = router;
