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
//Edit Profile Validation 
const validatorEditProfileData = (req) =>{
  //Check allowed field to edit
  const obj = req.body;
  const ALLOWED_UPDATE_FIELDs = ["firstName","lastName","age","skillset","gender","photoUrl"];  
  const isEditAllowed = Object.keys(obj).every((field) => {
    return ALLOWED_UPDATE_FIELDs.includes(field);
  });
  //Validate Each field individually
  if(isEditAllowed){
    const {
    firstName,
    lastName,
    age,
    gender,
    skillset
  } = obj;
    if(!firstName || validator.isEmpty(firstName)){
      throw new Error("First name is required ");
    }
    if(!lastName || validator.isEmpty(lastName)){
      throw new Error("Last name is requird");
    }
    //Check Skillset not allow to add more than 10
    if(obj?.skillset?.length > 10){
      throw new Error("Skillset Can't be more than 10");
    }
    return true;
  }else{
    return false;
  }
}
//Validate Password
const validatePassword = (req) =>{
  const obj = req.body;
  const {
    password,
    confirmPassword
  } = req.body || {};

  if(!password || validator.isEmpty(password.trim())){
      throw new Error("Password is required ");
    }
  if(!confirmPassword || validator.isEmpty(confirmPassword.trim())){
      throw new Error("ConfirmPassword is requird");
    }
  if(!validator.isStrongPassword(password, {
      minLength: 6,
      minLowercase: 1,
      minUppercase: 1,
      minNumbers: 1,
      minSymbols: 1,
})){
    throw new Error("Password should be strong");
  }
  if(password !== confirmPassword){
    throw new Error("Password and confirmed password should be matched");
  }
  return true;
}
module.exports = { validateSignUp,validatorEditProfileData,validatePassword};