const express = require("express");
const app = express();


app.use("/",(req,res)=>{
    console.log("Listen Resquest");
    res.send("Hello listen");
});
app.listen(3000,()=>{
    console.log("Server is ready to listen port 3000");
});



console.log("Starting a new project");