const mongoose = require("mongoose");
const validator = require("validator");
const userSchema = new mongoose.Schema({
    firstName:{
        type:String,
        required:[true,"First name is required"],
        trim:true,
        minLength:2,
        maxlength:50        
    },
    lastName:{
        type:String,  
        trim:true      
    },
    emailId:{
        type:String,
        required:[true,'Emailid is required'],
        unique:true,
        lowercase:true,
        trim:true,
        //match: [/^\S+@\S+\.\S+$/, 'Please use a valid email address']
        validate(value){
            if(!validator.isEmail(value)){
                throw new Error("Please use a valid email address");
            }
        }
    },
    password:{
        type:String,
        required:true,
        minLength:6,
        validate(value){
            if(!validator.isStrongPassword(value)){
                throw new Error("Please use a Strong Password"+value);
            }
        }
    },
    age:{
        type:Number,
        min:5,
        max:100
    },
    gender:{
        type:String,
        lowercase:true,
        //enum: ['male', 'female', 'other']
        validate(value){
            const val = value.toLowerCase();
            if(!["male","female","others"].includes(val)){
                throw new Error("gender data is not valid")
            }
        }
    },
    photoUrl:{
        type:String,
        default:"https://testingbot.com/free-online-tools/random-avatar/200?img=3",
        validate(value){
            if(!validator.isURL(value)){
                throw new Error("Please enter a valid photo url");
            }
        }
    },
    skillset:{
        type:[String],
    },
    dob:{
        type:Date,
        default:Date.now,
        validate(value){
            if(value > new Date()){
                throw new error("DOB canot be in future");
            }
        }
    },
    address: {
        street: { type: String, trim: true },
        city: { type: String, trim: true },
        state: { type: String, trim: true },
        postalCode: { type: String, trim: true,match: [/^\d{6}$/, "Postal code must be 6 digits"] },
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