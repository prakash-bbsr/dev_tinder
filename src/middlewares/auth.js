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

const userAuth =(req,res,next) => {
    console.log("User Auth Middleware");
    const token ='xyz';
    const isUserAuthorised = token === 'xyz';
    if(!isUserAuthorised){
        res.status(401).send("User is not Authorised");
    }else{
        next();
    }
};

module.exports = {
    adminAuth,
    userAuth
};