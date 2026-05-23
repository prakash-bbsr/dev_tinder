const express = require("express");
const paymentRouter = express.Router();

const { adminAuth,userAuth } = require("../middlewares/auth");
const User = require("../models/user");
const instance = require("../utils/razorpay");

paymentRouter.post("/payment", userAuth, async (req, res) => {
    console.log("Come under paymentRouter");
  try {
    console.log(req.userData);
    const options = {
      amount: 50000,
      currency: "INR",
      receipt: "order_rcptid_11",

      notes: {
        firstName: req.userData.firstName,
        lastName: req.userData.lastName,
        emailId: req.userData.emailId,
        membershipType: "silver"
      }
    };

    const order = await instance.orders.create(options);

    return res.status(200).json({ order });
     console.log("Server running");

  } catch (err) {

    console.error(err);

    return res.status(500).json({
      msg: err.message
    });

  }
});

module.exports = paymentRouter;