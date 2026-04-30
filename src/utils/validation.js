const validator = require("validator");
const validateSignUp = (data)=>{
   const {
    firstName,
    lastName,
    emailId,
    password,
    age,
    gender,
    photoUrl
  } = data;
  if(!firstName || validator.isEmpty(firstName)){
    throw new Error("First name is required ");
  }
  if(!lastName || validator.isEmpty(lastName)){
    throw new Error("Last name is requird");
  }
  if(!validator.isEmail(emailId)){
    throw new Error('Enter Valid Email');
  }
  if(!validator.isStrongPassword(password)){
    throw new error("Password should be strong");
  }
  if(age && !validator.isInt(age.toString(),{min:5,max:100})){
    throw new error("Age should be between 5 and 100");
  }
  if (gender && !["male", "female", "other"].includes(gender.toLowerCase())) {
    throw new Error("Invalid gender");
  }
  if (photoUrl && !validator.isURL(photoUrl)) {
    throw new Error("Invalid photo URL");
  }
}
module.exports = { validateSignUp };