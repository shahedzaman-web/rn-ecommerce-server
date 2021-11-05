const Address = require("./../model/address.model");

// createAddress
exports.createAddress = async (req, res, next) => {
  const { street, city, postal_code, phone_number, user, state } = req.body;
  try {
    if (!(street && city, postal_code && phone_number && user && state)) {
      res.status(400).send("All input is required");
    }

    await Address.create({
      street,
      city,
      postal_code,
      phone_number,
      user,
      state,
    });

    res
      .status(201)
      .send({ status: "success", message: "Successfully created address!" });
  } catch (err) {
    res.status(500).send({
      status: "failed",
      message: "Could not created Address.",
    });
    console.log(err);
  }
};

// getAddress
exports.getAddress = async (req, res, next) => {

  const id =req.params.id
  console.log({id})
  try {
    const address = await Address.findById(id);
   
    if (!address) {
      res.status(404).send({
        status: "failed",
        message: "Address not found.",
      });
    }
    res.status(200).send({
      status: "success",
      payload: address,
    });
  } catch (err) {
    res.status(500).send({
      status: "failed",
      message: "Could not find Address!",
    });
  }
};

exports.deleteAddress = async (req, res, next) => {
  const id = req.params.id;

  Address.findByIdAndRemove(id)
    .then((data) => {
      if (!data) {
        res.status(404).send({
          status: "failed to find address",
          message: `Cannot delete Address with id=${id}. Maybe Address was not found!`,
        });
      } else {
        res.send({
          status: "success",
          message: "Address was deleted successfully!",
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        status: "failed",
        message: "Could not delete Address with id=" + id,
      });
    });
};
