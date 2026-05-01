const express = require("express");
const profileRouter = express.Router();
const User = require("../models/user");
const jwt = require("jsonwebtoken");
const { adminAuth,userAuth } = require("../middlewares/auth");
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
    const decodedMessage = jwt.verify(token,'secret_key12345',{ expiresIn: 60 * 60 });
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
profileRouter.get("/profileWithMiddleware",userAuth,async (req,res) =>{
  try{
    console.log("Come under profileWithMiddleware");
   const userData = req.userData    
    res.status(200).send(userData);
  }catch(err){
    res.status(400).send(err.message);
  }
});
module.exports = profileRouter;