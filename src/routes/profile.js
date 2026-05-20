const express = require("express");
const profileRouter = express.Router();
const User = require("../models/user");
const jwt = require("jsonwebtoken");
const { adminAuth,userAuth } = require("../middlewares/auth");
const {validatorEditProfileData,validatePassword} = require("../utils/validation");
const bcrypt = require("bcrypt");
const crypto = require("crypto");
/**
 * Get User Profile data
 */
profileRouter.get("/profile",async (req,res) =>{
  try{
    const readCookies = req.cookies;
    const {token} = readCookies;
    if(!token){
      throw new Error("InValid Token");
    }
    //Add logic to verify token if success get the profile date otherwise redirect to login page.
    //console.log(readCookies);
    //validate token as per the secret key
    //{ expiresIn: '1d' }
    const decodedMessage = jwt.verify(token,process.env.JWT_SECRET,{ expiresIn: 60 * 60 });
    console.log(decodedMessage);
    const {_id} = decodedMessage;
    //get data as per cookies
    const userData = await User.findById(_id);
    if(!userData){
      throw new error('UserId is not found');
    }
    res.status(200).send(userData);
  }catch(err){
    res.status(400).send(err.message);
  }
});
//Profile with middleware
profileRouter.get("/profile/view",userAuth,async (req,res) =>{
  try{
   console.log("Come under profileWithMiddleware");
   const userData = req.userData       
    res.status(200).send(userData);
  }catch(err){
    res.status(400).send(err.message);
  }
});
//Edit User Profile data
profileRouter.patch("/profile/edit",userAuth,async(req,res)=>{
  try{          
    if(!validatorEditProfileData(req)){
      return res.status(400).json({
        success:false,
        message:"Requested field is not allowed"
      });
    }
   const loggedInUserData = req.userData;
   //Update userdata
   //Object.keys(req.body).forEach(key=>(loggedInUserData[key]=req.body[key]));
   Object.keys(req.body).forEach(function (key) {
    loggedInUserData[key] = req.body[key];
  });
   await loggedInUserData.save();
   //console.log(userData);
   return res.status(200).json({
        message: "User updated successfully",
        data: loggedInUserData
      });
   res.status(200).send("User Profile Update successfully");   
  }catch(err){
    res.status(400).send("Something Wend Wrong"+err.message);
  }
});
/**
 * Forgot Password 
 */
profileRouter.post("/forgot-password",async(req,res)=>{
  try{
      console.log("Under forgot password");
      const { emailId } = req.body;
      console.log(emailId);
      if (!emailId) {
        return res.status(400).json({ message: "Email is required" });
      }
      const user = await User.findOne({ emailId });
      console.log("User Data is ="+user);
      // Always send same response (avoid user enumeration)
      if (!user) {
        return res.json({ message: "If email exists, reset link sent" });
      }
      // Generate raw token
      const resetToken = crypto.randomBytes(32).toString("hex");
      // Hash token before saving to DB
      const hashedToken = crypto
        .createHash("sha256")
        .update(resetToken)
        .digest("hex");

      user.resetToken = hashedToken;
      user.resetTokenExpire = Date.now() + 15 * 60 * 1000; // 15 mins
      await user.save();
      const resetURL = `${process.env.CLIENT_URL}/reset-password/${resetToken}`;
      // 👉 Replace this with real email service
      console.log("Reset Link:", resetURL);
      return res.json({ message: "If email exists, reset link sent" });
  }catch(err){
     res.status(400).send("Something Wend Wrong"+err.message);
  }
});
/**
 * Reset Password
 */
profileRouter.post("/reset-password/:token",async(req,res)=>{
   try {
    const { password } = req.body;
    const { token } = req.params;
    if(!validatePassword(req)){
      return res.status(400).json({ message: "There is an issue in validator" });
    }   
    // Hash incoming token to match DB
    const hashedToken = crypto
      .createHash("sha256")
      .update(token)
      .digest("hex");
    const user = await User.findOne({
      resetToken: hashedToken,
      resetTokenExpire: { $gt: Date.now() },
    });
    if (!user) {
      return res.status(400).json({ message: "Invalid or expired token" });
    }
    // Hash new password
    user.password = await bcrypt.hash(password, 10);
    // Clear reset fields
    user.resetToken = undefined;
    user.resetTokenExpire = undefined;
    await user.save();
    return res.json({ message: "Password reset successful" });
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
})

module.exports = profileRouter;