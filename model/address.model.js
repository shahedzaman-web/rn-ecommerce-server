const mongoose = require("mongoose");

const addressSchema = new mongoose.Schema({
  street: { type: String, required: true },
  city: { type: String,required: true },
  state: { type: String,required: true },
  postal_code: { type: String,required: true },
  phone_number: { type: String,required: true },
  user: { type: String, ref: 'user'},
});

module.exports = mongoose.model("address", addressSchema);
