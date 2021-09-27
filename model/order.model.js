const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema({
  user: {  type: String, ref: 'user'},
  total_price: { type: String,required: true},
  total_quantity: { type: String,required: true },
  items:{ type: Array,required: true},
  payment_id: { type: String,required: true},
  order_status:{ type: String,required: true,default:"On Process"},

});

module.exports = mongoose.model("order", orderSchema);
