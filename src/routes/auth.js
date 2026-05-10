const express = require("express");
const authRouter = express.Router();
const bcrypt = require("bcrypt");
const User = require("../models/user");
const {validateSignUp} = require("../utils/validation");

//Registered a user
authRouter.post('/signUp',async (req,res,next)=>{
  console.log((req.body));
  try{      
      // Need to use validator method so that we can check all inputs before updating into the databse.
      validateSignUp(req.body);
      //Keep Password data
      const {password} = req.body;
      const passwordhash = await bcrypt.hash(password,10);
      //console.log(passwordhash);      
      const userData = {
        ...req.body,
        password: passwordhash
     };
      const user = new User(userData);
      await user.save();
      res.status(201).json({
        success: true,
        message: "User created successfully",
        data: user
      });
      //res.send("Data inserted Successfully");
   } catch (err){
    console.log("Exception is occured");
    if (err.code === 11000) {
      //return res.status(400).send("Email already exists");
      return res.status(400).json({
        success: false,
        message: "Email already exists"
      });
    }
     if (err.name === "ValidationError") {
      console.log("validation error checking");
      return res.status(400).json({
        success: false,
        message: err.message
      });
    }
    //res.status(500).send(err.message);
    res.status(500).json({
      success: false,
      message: err.message
    });
   }
});
//Login Function
authRouter.post("/login",async(req,res) => {
  try{
    const {emailId,password} = req.body;
    // Basic validation
    if (!emailId || !password) {
      return res.status(400).json({
        success: false,
        message: "Email and password are required"
      });
    }
    //Get records from the databse
    const records = await User.findOne({'emailId':emailId}).select("+password");
    if(!records){
      return res.status(401).json({
        success: false,
        message: "Invalid credentials"
      });
    }   
    //Password check
    //const passwordCheck =  await bcrypt.compare(password,records.password);   
    const passwordCheck = await records.validatePassword(password);
    if(!passwordCheck){
      return res.status(401).json({
        success: false,
        message: "Invalid credentials"
      });
    }else{
      //Create JWT token
      //const token = await jwt.sign({_id:records._id},"secret_key12345",{ expiresIn: 60 * 60 });
      const token = await records.getJwt();
      console.log("JwtToken is ="+token);
      //set jwt token to cookies
      //res.cookie('token',token,{expires:new Date(Date.now()+8 * 360000)}); //360000 milli seconds
      res.cookie("token", token, {
        expires: new Date(Date.now() + 8 * 360000),
        httpOnly: true,
        secure: true,
        sameSite: "strict"
      });
      // Step 3: send safe data
      const safeUser = {
        _id: records._id,
        firstName: records.firstName,
        lastName: records.lastName,
        emailId: records.emailId,
        gender: records.gender,
        photoUrl: records.photoUrl,
        dob: records.dob,
        skillset: records.skillset
      };

      res.status(200).json({
        success: true,
        message: "User logged in successfully",
        data: safeUser
      });
    }   
    //res.send("Login successfully");
  } catch (err){
    res.status(500).json({
        success: false,
        message: err.message
      });
  }
});
authRouter.post("/logout",async(req,res) =>{
    res.clearCookie("token", {
        httpOnly: true,
        secure: true,
        sameSite: "strict"
   });
   /*res.cookie("token", "", {
    expires: new Date(0),
    httpOnly: true,
    secure: true,
    sameSite: "strict"
  });*/

  res.status(200).json({
    success: true,
    message: "User logged out successfully"
  });

});
module.exports = authRouter;