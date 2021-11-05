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
app.use("/api/user", auth, addressRouter);
app.use("/api", auth, stripe);
app.use("/api/user", auth, order);

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

// const accountSid = 'AC580764dafd5acc7f81334ed5bd34e287'; // Your Account SID from www.twilio.com/console
// const authToken = '38cfafeb5f448c8c15fa8c980c8fb006'; // Your Auth Token from www.twilio.com/console

// const twilio = require('twilio');
// const client = new twilio(accountSid, authToken);

// client.messages
//   .create({
//     body: 'Hello from Node',
//     to: '+8801786233560', // Text this number
//     from: '+12345678901', // From a valid Twilio number
//   })
//   .then((message) => console.log(message.sid));

module.exports = app;