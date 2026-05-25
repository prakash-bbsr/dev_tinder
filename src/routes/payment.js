const express = require("express");
const paymentRouter = express.Router();

const { adminAuth,userAuth } = require("../middlewares/auth");
const User = require("../models/user");
const instance = require("../utils/razorpay");
const Payment = require("../models/payments");
const membershipAmount = require("../utils/constants");
const {validateWebhookSignature} = require("razorpay/dist/utils/razorpay-utils");
const user = require("../models/user");

//Payment APi
paymentRouter.post("/payment/create", userAuth, async (req, res) => {
    console.log("Come under paymentRouter");
  try {
    console.log(req.userData);
    const { membershipType} = req.body;
    const {firstName,lastName,emailId} = req.userData;
    const amount = membershipAmount[membershipType];
    console.log("amount is = ",amount);
    //Dynamic Passing Data
     const options = {
      amount: amount*100,
      currency: "INR",
      receipt: "order_rcptid_14",
      notes: {
        firstName,
        lastName,
        emailId,
        membershipType: membershipType
      }
    };
    console.log(options);

    /*const options = {
      amount: 30000,
      currency: "INR",
      receipt: "order_rcptid_12",

      notes: {
        firstName: req.userData.firstName,
        lastName: req.userData.lastName,
        emailId: req.userData.emailId,
        membershipType: "silver"
      }
    };*/


    const order = await instance.orders.create(options);
    const payment = new Payment({
      userId:req.userData._id,
      orderId:order?.id,
      status:order?.status,
      amount:order?.amount,
      currency:order?.currency,
      receipt:order?.receipt,
      notes:order?.notes,
    });
    const savedPayment= await payment.save();

    return res.status(200).json({ ...savedPayment.toJSON(),keyId:process.env.RAZORPAY_Key_ID});
     console.log("Server running");

  } catch (err) {

    console.error(err);

    return res.status(500).json({
      msg: err.message
    });

  }
});

//webhook Api
paymentRouter.post("/payment/webhook",async(req,res)=>{
  try{
    const webhookSignature = req.get["X-Razorpay-Signature"];
    const isWebhookValid = validateWebhookSignature(
      JSON.stringify(req.body),
      webhookSignature,
      process.env.RAZORPAY_WEBHOOK_SECRET
    );
    if(!isWebhookValid){
     return res.status(400).json({msg:"Webhook signature is invalid"});
    }
    //Update my payment status in databse
    const paymentDetails = req.body.payload.payment.entity;
    const payment = await Payment.findOne({orderId:paymentDetails.order_id});
    payment.status = paymentDetails.status;
    await payment.save();
   if(req.body.event == "payment.captured"){
    const user = await User.findOne({_id:payment.userId});
    user.isPremium = true;
    user.membershipType = payment.notes.membershipType;
    await user.save();
   }
   if(req.body.event == "payment.failed"){

   }
   //return to rozer pay
   return res.status(200).json({msg:"Webhook received succesfully"});

  }catch(err){
   return res.status(500).json({msg:err.message});
  }
});

//Payment Verify Api
paymentRouter.get("/premium/verify",userAuth,async(req,res)=>{
 const user = req.userData.toJSON();
 console.log(user); 
 if(user.isPremium){
   return res.json({isPremium:true});
 }
 return res.json({isPremium:false});
});
module.exports = paymentRouter;