require("dotenv").config();
const express = require("express");
//Mogodb Databse connection
const {connectDB} = require('./config/database');
const app = express();
const validator = require("validator");
const User = require("./models/user");
//const {validateSignUp} = require("./utils/validation");
//const bcrypt = require("bcrypt");

const cookieParser = require("cookie-parser");
//const jwt = require("jsonwebtoken");
const { adminAuth,userAuth } = require("./middlewares/auth");

const authRouter = require("./routes/auth");
const profileRouter = require("./routes/profile");
const requestRouter = require("./routes/request");
const userRouter = require("./routes/user");
//Middleware is used to convert JSON object to javascript Object.
app.use(express.json()); 
app.use(cookieParser());

app.use("/",authRouter);
app.use("/",profileRouter);
app.use("/",requestRouter);
app.use("/",userRouter);



/**
 * @Purpose Get Records from the databse
 */
app.get("/feed",async (req,res)=>{
  try{
    const userData = await User.find({}).sort({ createdAt: -1 });
    if(userData.length===0){
       res.send("Records not found");      
    }else{
       res.send(userData);
    }   
  }catch(err){
    res.status(500).send(err.message);
  }
});
/**
 * @purpose Get a Single Records
 */
app.get("/getUserByEmail",async (req,res)=>{
  try{
    const userEmail = req.body.emailId;
    
    const userData = await User.findOne({"emailId":userEmail});
    //const userData = await User.findById(userEmail,'age firstName emailId');

    if(userData){
      console.log(userData.fullName);
      res.send(userData);
    }else{
      res.send("Record is not found");
    }
  }catch(err){
    res.status(400).send("Somethis is Wrong",err.message);
  }
});
/**
 * @purpose Deleted user Data
 */
app.delete("/user",async(req,res)=>{
  try{
    const userId = req.body.id;
    console.log(userId);
    const userDelete = await User.findByIdAndDelete(userId);
    console.log(userDelete);
    if(userDelete){
      res.send("User is deleted Successfully");
    }else{
      res.send("User is not deleted Successfully");
    }
  }catch(err){
    res.status(400).send("Something is wrong");
  }
});
/**
 * @purpose Update the API Document
 */
app.patch("/user/:userId",async(req,res)=>{
  try{
      const userId = req.params?.userId;
      const obj = req.body;
      //Need to add validation allow some fields to update
      const ALLOWED_UPDATE = ["firstName","lastName","photoUrl","age","skills"];
      const isUpdateAllowed = Object.keys(obj).every((k)=>
        ALLOWED_UPDATE.includes(k)
      );
      if(!isUpdateAllowed){
        //res.status(400).send("Update not allowed");
        return res.status(400).json({
          success: false,
          message: "Update not allowed"
        });
      }
      //Check Skillset not allow to add more than 10
      if(obj?.skillset?.length > 10){
        throw new Error("Skillset Can't be more than 10");
      }
      //For Update need to set runValidators:true for updating the validation
      const updateUser = await User.findByIdAndUpdate(userId,obj,{ returnDocument: 'after',runValidators:true });
      if (updateUser) {
        return res.status(200).json({
          message: "User updated successfully",
          data: updateUser
        });
      } else {
        return res.status(404).json({
          message: "User not found"
        });
    }
  }catch(err){
    res.status(400).send("Something Wend Wrong"+err.message);
  }
})
/**
 * @purpose update user using put method
 * findOneAndReplace function is used to update the whole document
 */
app.put("/user",async(req,res)=>{
  try{
      const userId = req.body.id;
      const obj = req.body;
      //const updateUser = await User.findOneAndReplace({ _id: userId },obj);
      const updateUser = await User.findOneAndUpdate({ _id: userId },obj);      
      if (updateUser) {
        return res.status(200).json({
          message: "User updated successfully",
          data: updateUser
        });
      } else {
        return res.status(404).json({
          message: "User not found"
        });
    }
  }catch(err){
    res.status(400).send("Something Wend Wrong");
  }
})

connectDB()
  .then(() =>{
    console.log ("Databse connection established...");
    app.listen(3000,()=>{
      console.log("Server is ready to listen port 3000");
    });
  })
 .catch((err)=>{
  console.error("database cannot be connected!", err);
});




// Handel Auth Middleware  for all GET,POST ...... REQUESTS
//const { adminAuth,userAuth } = require("./middlewares/auth");
//Call adminAuth middle to check authorization access. It matches prefix path /admin ,/admin/profile,/admin.info etc
//app.use("/admin", adminAuth);

//All Matches the exact path . /admin/profile only
/*app.all("/admin/profile",(req,res)=>{
  res.status(401).send("User is not Authorised");
  //res.send("Showing Admin Profile");
});
app.get("/admin/profile/data",(req,res)=>{
  res.send("Showing Admin Profile");
});

app.get("/admin/getAllData",(req,res) => {
  res.send("All Data sent");
});

//URL with userAuth middleware 
app.get('/user',userAuth,(req,res,next) => {
  res.send("user Data Sent");
});
//Login url without userAuth middleware 
app.get('/user/login',(req,res)=> {
  res.send("User Login Successfully");
});

//Error handeling
app.get('/getUserData',(req,res) =>{
  try{
    throw new error('adsghajgdajgadsj');
    res.send("User Data");
  }catch(err){
    //res.status(500).send(err.message);
    res.status(500).send('This is custom error');
  }  
});

//Global Error
app.use('/',(err,req,res,next)=>{
  res.status(500).send('Something Went Wrong');
});*/

/*app.use("/admin",(req,res,next)=>{
 const token ="123456789";
 const isAdminAuthorised = token===1234;
 if(isAdminAuthorised){
   res,status.send("Authorised Successfully");
 }else{
   res.status(401).send("Unauthorised Request");
 }
});*/

// app.get(/^\/ab*c$/, (req, res) => {
//   res.send("Welcome to here");
// });
/*app.get("/user/:id/:address",(req,res)=>{
    console.log(req.params);
    res.send({'name':'prakash','email':'pcn2007nayak@gmail.com'});
});
app.post("/user",(req,res)=>{
  //saved successfully
  res.send("Data inserted successfully into the database");
});
app.put("/user",(req,res)=>{
     //saved successfully
  res.send("Data Updated successfully into the database");
});
app.delete("/user",(req,res)=>{     
  res.send("Data Deleted successfully");
});
app.patch("/user",(req,res)=>{     
  res.send("Data updated successfully");
});*/

// app.use("/test",(req,res)=>{
//     res.send("This is the test request");
// });
// app.use("/",(req,res)=>{
//     console.log("Listen Resquest");
//     res.send("Hello listen");
// });

/*app.use("/",
  (req,res,next)=>{
    console.log("Listen Resquest");
    //res.send("Hello listen");
    next();
},(req,res)=>{
  console.log("Listen Request2");
  res.send("Hello listen request2");
});*/

/*app.listen(3000,()=>{
    console.log("Server is ready to listen port 3000");
});*/

console.log("Starting a new project");