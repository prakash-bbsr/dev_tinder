const express = require('express');
const userRouter = express.Router();
const User = require("../models/user");
const ConnectionRequest = require("../models/connectionRequest");
const {userAuth } = require("../middlewares/auth");
const USER_SAFE_DATA = "firstName lastName _id";
/**
 * This API returns all received connection request of a login user.Login user either accept the connection request or reject the connection request
 */
userRouter.get("/user/requests/received",userAuth,async(req,res)=>{
    try{
        const loginUserId = req.userData._id;
        //Get records from the request connection tables where status is interested.
        const requestConnectionData = await ConnectionRequest.find({
            toUserId:loginUserId,
            status:"interested"
        })//.populate("fromUserId",["firstName","lastName"]);
        .populate("fromUserId", USER_SAFE_DATA).lean();
        console.log(requestConnectionData);
        res.status(200).json({
            status: "success",
            message: "Fetched Data Successfully",
            data:requestConnectionData
        });
    }catch(err){
        res.status(400).send(err.message);
    }
});
/**
 * This API returns all connection requests where accepted by others or accepted other members.
 */
userRouter.get('/user/connection',userAuth,async(req,res)=>{
    try{
        const loginUserId = req.userData._id;
        //Get records from the request connection tables where status is interested.
        const requestConnectionData = await ConnectionRequest.find({
            $or:[
                {toUserId:loginUserId,status:"accepted"},
                {fromUserId:loginUserId,status:"accepted"}
            ]            
        })//.populate("fromUserId",["firstName","lastName"]);
        .populate("fromUserId", USER_SAFE_DATA).lean()
        .populate("toUserId",USER_SAFE_DATA).lean();
        console.log(requestConnectionData);
        const data = requestConnectionData.map((row)=>{
            //console.log(row.fromUserId._id);
            if(row.fromUserId._id.toString() === loginUserId.toString()){
                return row.toUserId;
            }
            return row.fromUserId;
        });
         res.status(200).json({
            status: "success",
            message: "Fetched Data Successfully",
            data:data
        });
    }catch(err){
        res.status(400).send(err.message);
    }
});
//Get Feed users data not send before to the users
userRouter.get('/user/feed',userAuth,async(req,res)=>{
    try{
        const page = parseInt(req.query.page) || 1;
        let limit = parseInt(req.query.limit) || 10;
        const skip = (page-1)*limit;
        if(limit >50){
            limit = 50;
        }            
        const loginUserId = req.userData._id;
        const requestConnectionData = await ConnectionRequest.find({        
            $or:[{fromUserId:loginUserId},{toUserId:loginUserId}],
        }).select("fromUserId toUserId");
        const hideUsersFromFeed = new Set();
        requestConnectionData.forEach((req)=>{
            hideUsersFromFeed.add(req.fromUserId.toString());
            hideUsersFromFeed.add(req.toUserId.toString());
        });
        console.log(hideUsersFromFeed);
        const users = await User.find({
            $and: [
                { _id: { $nin: Array.from(hideUsersFromFeed) } },
                { _id: { $ne: loginUserId } }
            ]
        }).skip(skip).limit(limit).select(USER_SAFE_DATA);
        res.status(200).json({
            success:true,
            message:"Fetched Successfully",
            data:users
        });
    }catch(err){
        res.status(400).send(err.message);
    }
});
module.exports = userRouter;