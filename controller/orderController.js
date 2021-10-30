const Order = require("./../model/order.model");

exports.placeOrder = async (req, res, next) => {
  try {
    const { user, total_price, total_quantity, items, payment_id, address } =
      req.body;

    if (
      !(user && total_price && total_quantity && items && payment_id, address)
    ) {
      res.status(400).send("All input is required");
    }

    const order = await Order.create({
      user,
      total_price,
      total_quantity,
      items,
      payment_id,
      address,
    });
    console.log({ order });
    res
      .status(201)
      .send({ status: "success", message: "Successfully Placed order!" });
  } catch (err) {
    res.status(500).send({
      status: "failed",
      message: "Could not Placed order.",
      error: err,
    });
    console.log(err);
  }
};

exports.getOrder = async (req, res, next) => {
  try {
    const order = await Order.find({});
    res.status(200).send({
      status: "success",
      payload: order,
    });
  } catch (err) {
    res.status(500).send({
      status: "failed",
      message: err,
    });
  }
};
