const mongoose = require("mongoose");
const userSchema = new mongoose.Schema({
    firstName:{
        type:String,
        trim:true,
        minLength:4        
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
        type:String,
        required:true,
    },
    age:{
        type:Number,
        min:0
    },
    gender:{
        type:String,
        //enum: ['male', 'female', 'other']
        validate(value){
            const val = value.toLowerCase();
            if(!["male","female","others"].includes(val)){
                throw new Error("gender data is not valid")
            }
        }
    },
    dob:{
        type:Date,
        default:Date.now,
    },
    address: {
        street: { type: String, trim: true },
        city: { type: String, trim: true },
        state: { type: String, trim: true },
        postalCode: { type: String, trim: true },
        country: { type: String, trim: true }
    },
},{ 
    timestamps: true,
    toJSON: { virtuals: true },     
});
// Or by using the virtual method as following:
userSchema.virtual('fullName').get(function() {
  return this.firstName + ' ' + this.lastName;
});
module.exports = mongoose.model("User",userSchema);