const mongoose = require("mongoose");
const userSchema = new mongoose.Schema({
    firstName:{
        type:String,
        trim:true        
    },
    lastName:{
        type:String,  
        trim:true      
    },
    emailId:{
        type:String,
        required:true,
        unique:true,
        lowercase:true,
        trim:true,
        match: [/^\S+@\S+\.\S+$/, 'Please use a valid email address']
    },
    password:{
        type:String
    },
    age:{
        type:Number,
        min:0
    },
    gender:{
        type:String,
        enum: ['male', 'female', 'other']
    },
    dob:{
        type:Date
    },
    address: {
        street: { type: String, trim: true },
        city: { type: String, trim: true },
        state: { type: String, trim: true },
        postalCode: { type: String, trim: true },
        country: { type: String, trim: true }
    },
},{ 
    timestamps: true     
});
module.exports = mongoose.model("User",userSchema);