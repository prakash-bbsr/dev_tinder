const express = require('express');
const requestRouter = express.Router();
const { adminAuth,userAuth } = require("../middlewares/auth");
const User = require("../models/user");
const ConnectionRequest = require("../models/connectionRequest");
const sendEmail = require("../utils/sendEmail");
//Send Connection API
requestRouter.post("/request/send/:status/:toUserId",userAuth,async(req,res)=>{
  try{
    //Get Loggedin User/From User data from userAuth Middleware
    const fromUserId = req.userData._id;
    const toUserId = req.params.toUserId;
    const status = req.params.status;
    const acceptedStatus = ["ignored","interested"];
    //Check ststus should be any one from the acceptedStatus
    if(!acceptedStatus.includes(status)){
      return res.status(401).json({
        success: false,
        message: "Invalid Status"
      });
    }
    //Check touserId is exist in our database
    const checkTouserExist = await User.findById(toUserId);
    if(!checkTouserExist){
      return res.status(401).json({
        success: false,
        message: "Invalid toUserid"
      });
    }
    //Check there should not be duplicate fromUserId and toUserID
    const checkFromTouserExist = await ConnectionRequest.findOne({
      $or: [
        { fromUserId,toUserId },
        { fromUserId: toUserId, toUserId: fromUserId }
      ]
    });

    if(checkFromTouserExist){
      return res.status(401).json({
        success: false,
        message: "Already exist records"
      });
    }
    //Check there should not be fromUserId and toUserId should not be same
    /*if (fromUserId.equals(toUserId)) {
      return res.status(401).json({
        success: false,
        message: "You can't send same request to the same user"
      });
    }*/
    const connectionRequest = new ConnectionRequest({
      fromUserId,toUserId,status
    });
    const data = await connectionRequest.save();
    console.log("Prakash is in connection section");
    //Send Email using AWS SES
    const mailRes = await sendEmail.run("This is subject","This is the mail body");
    console.log(mailRes);
    res.status(200).json({
      status: "success",
      message: req.userData.firstName + " is " + status + " " + checkTouserExist.firstName,
      data:data
    });
  }catch(err){
    res.status(400).send(err.message);
  }
});
//Accept or reject connection
//POST /request/review/:status/:requestId
requestRouter.post("/request/review/:status/:requestId",userAuth,async(req,res)=>{
  try{
    const loginUserId = req.userData._id;
    const {status,requestId} = req.params;
    const acceptedStatus = ["accepted","rejected"];
    if(!acceptedStatus.includes(status)){
      return res.status(401).json({
        success: false,
        message: "Entered wrong status"
      });
    }
    //Get data from the request table.
    const requestedToUserData = await ConnectionRequest.findOne({
      toUserId:loginUserId,
      status:"interested",    
      _id: requestId 
    });
    if(!requestedToUserData){
      return res.status(401).json({
        success: false,
        message: "Connection Request not found"
      });
    }
    requestedToUserData.status = status;
    await requestedToUserData.save();
    return res.status(200).json({
        success: true,
        message: req.userData.firstName+" is "+ status+ " Request connection"
      });
  }catch(err){
    res.status(400).send(err.message);
  }
});
module.exports = requestRouter;