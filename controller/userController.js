const User = require("./../model/user");
const Order = require("./../model/order.model")
const Address = require("./../model/address.model")
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");


// @desc    Register admin
exports.register =  async (req, res, next) => {
 
      // upload to cloudinary

      const imageUrl = await req.file.path;


    try {
      // Get user input
      const { fullName, email, password } = req.body;

      // Validate user input
      if (!(email && password && fullName )) {
        res.status(400).send("All input is required");
      }

      // check if user already exist
      // Validate if user exist in our database
      const oldUser = await User.findOne({ email });

      if (oldUser) {
        return res.status(409).send("User Already Exist. Please Login");
      }


      //Encrypt user password
      encryptedUserPassword = await bcrypt.hash(password, 10);

      if (!imageUrl) {
        return res.status(400).send({ message: "Image was not uploaded!" });
      }

      // Create user in our database
      const user = await User.create({
        fullName: fullName,
        image: imageUrl,
        email: email.toLowerCase(), // sanitize: convert email to lowercase
        password: encryptedUserPassword,
      });

      // Create token
      const token = jwt.sign(
        { id: user._id, email, fullName, image: imageUrl },
        process.env.TOKEN_KEY,
        {
          expiresIn: "5h",
        }
      );
      // save user token
      user.token = token;

      // return new user
      res.status(201).json({ message: "success", token: token });
    } catch (err) {
      console.log(err);
    }
  };

// @desc    Login Admin
exports.login = async (req, res, next) => {
  try {
    // Get user input
    const { email, password } = req.body;

    // Validate user input
    if (!(email && password)) {
      res.status(400).send("All input is required");
    }
    // Validate if user exist in our database
    const user = await User.findOne({ email });
    const order = await Order.findOne({ user: user._id })
    const address = await Address.findOne({ user: user._id })

console.log({order})
console.log({address})

    if (user && (await bcrypt.compare(password, user.password))) {
      // Create token
      const token = jwt.sign(
        { id: user._id, email, fullName: user.fullName,image: user.image },
        process.env.TOKEN_KEY,
        {
          expiresIn: "5h",
        }
      );

      // save user token
      user.token = token;

      // user
      return res.status(200).json({ message: "success", token: token,order: order,address: address });
    }
    return res.status(400).send("Invalid Credentials");
  } catch (err) {
    console.log(err);
  }
};
