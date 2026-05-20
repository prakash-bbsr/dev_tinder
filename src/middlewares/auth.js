const User = require("../models/user");
const cookieParser = require("cookie-parser");
const jwt = require("jsonwebtoken");
const adminAuth = (req,res,next) => {
    console.log("Admin Auth Middleware");
    const token = 'xyz';
    const isAdminAuthorised = token ==="xyz";
    //const isAdminAuthorised = false;
    if(!isAdminAuthorised){
        res.status(401).send("Unauthorised Request");
    }else{
        next();
    }
};

const userAuthOld =(req,res,next) => {
    console.log("User Auth Middleware");
    const token ='xyz';
    const isUserAuthorised = token === 'xyz';
    if(!isUserAuthorised){
        res.status(401).send("User is not Authorised");
    }else{
        next();
    }
};

//This middleware is used for reading from cookiw and verify jwttoken and get user data
const userAuth = async (req,res,next) => {
    try{
        //Read data from cookies
        const {token} = req.cookies;    
        console.log("Token is="+token);
        if(!token){
           return res.status(401).json({ message: 'Token not found' });
        }
        //Validate jwt token
        const DecodeToken = jwt.verify(token,process.env.JWT_SECRET);
        const {_id} = DecodeToken;
        const userData = await User.findById(_id);
        if(!userData){
           return res.status(404).json({ message: "User not found" });
        }
        req.userData = userData;
        next();
    }catch(err){
        return res.status(401).json({ message: "Invalid token", error: err.message });
    }    
};

module.exports = {
    adminAuth,
    userAuth
};