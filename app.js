const express = require("express");
const app = express();
const cors = require("cors");
const bodyParser = require("body-parser");

require("dotenv").config();
app.use(cors());
app.use(bodyParser.json({ limit: "50mb" }));
app.use(bodyParser.urlencoded({ extended: true, limit: "50mb" }));

// db import
require("./config/database").connect();
// internal imports
const userRouter = require("./routes/userRoute");
const addressRouter = require("./routes/addressRoute");
const auth = require("./middleware/auth");
const stripe = require("./utils/stripe");
const order = require("./routes/orderRoute")


//routing setup
app.use("/api/auth", userRouter);
app.use("/api/user", addressRouter);
app.use("/api", stripe);
app.use("/api/user", order);

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.get("/welcome", auth, (req, res) => {
  res.status(200).send("Welcome to FreeCodeCamp 🙌");
});

// This should be the last route else any after it won't work
app.use("*", (req, res) => {
  res.status(404).json({
    success: "false",
    message: "Page not found",
    error: {
      statusCode: 404,
      message: "You reached a route that is not defined on this server",
    },
  });
});

module.exports = app;
