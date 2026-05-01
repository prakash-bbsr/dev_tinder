const express = require('express');
const requestRouter = express.Router();
const { adminAuth,userAuth } = require("../middlewares/auth");
//Send Connection API
requestRouter.post("/sendNewConnection",userAuth,async(req,res)=>{
  try{
    const userData = req.userData;
    console.log("Send connection request");
    res.send(userData.firstName +" is sending Connection Request send Successfully");
  }catch(err){
    res.status(400).send(err.message);
  }
});
module.exports = requestRouter;