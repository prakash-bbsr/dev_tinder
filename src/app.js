const express = require("express");
const app = express();

app.get("/user",(req,res)=>{
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
});

// app.use("/test",(req,res)=>{
//     res.send("This is the test request");
// });
app.use("/",(req,res)=>{
    console.log("Listen Resquest");
    res.send("Hello listen");
});

app.listen(3000,()=>{
    console.log("Server is ready to listen port 3000");
});



console.log("Starting a new project");