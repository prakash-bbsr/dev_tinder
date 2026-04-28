const express = require("express");
//Mogodb Databse connection
const {connectDB} = require('./config/database');
const app = express();

const User = require("./models/user");
//Middleware is used to convert JSON object to javascript Object.
app.use(express.json()); 
//Registered a user
app.post('/signUp',async (req,res,next)=>{
  console.log((req.body));
  try{      
      const user = new User(req.body);
      await user.save();
      res.send("Data inserted Successfully");
   } catch (err){
    if (err.code === 11000) {
      return res.status(400).send("Email already exists");
    }
    res.status(500).send(err.message);
   }
});

connectDB()
  .then(() =>{
    console.log ("Databse connection established...");
    app.listen(3000,()=>{
      console.log("Server is ready to listen port 3000");
    });
  })
  .catch((err)=>{
    console.error("database cannot be connected!");
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