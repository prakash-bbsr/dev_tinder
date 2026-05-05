-create a repository
-initialize the repository
-node_modules,package.json,package-lock.json
-install express
-create a server
-Listen to port 3000
-Write request handeler for test/hello
-install nodemon and update script inside the package.json
-Difference between carent and tilde
-What are depedencies
-What is the use of -g while install npm package

-initialize git
- .gitignore
- create a remort repo on github
- pish all code to remote origin
- play with rout extension
- Order of the rout matter
- install postman and test the Api
- Write logic for all http methods GET,POST,DELETE,PATCH,PUT methods.
- Explorer different routing with regular expression and character (?,*,+,())
- Use of regx 
-Reading the query parameter in the routes
-Reading the Dynamic routes

-Multiple Route Handler- Play with Code
-Next()
-Next function and error along with res.send()
-app.use("route",rh,[rh1,rh2],rh3);
-What is a middleware? why do we need it?
-How express js basically handel requests behind the scenes
-Difference between app.use and app.all
-Write a dummy auth middleware for admin
-Write a dummy middleware for all users routes,except user/login
-Error handeling
-Wildcard error handeling (it should be in end od the code)

- Create a free cluster on MongoDB official website (Mongo Atlas)
- Install mongoose library
- Connect your application to the databse "Connection-Url"/dev_Tinder
- Call the connectionDB function and connect to databse before starting application on 3000 port
- Create a userSchema & user model
- Create POSt /Signup API to add Data to database
- Push some document using API call from the postman
- Error Handeling using tray and catch
- Add Dynamic data for signup api from the postman
- user.findOne with duplicate data and make sure which records will return
- Api getUserByEmail()
- Api feed -get all users data
- Api get user by id

-Delete user
-Update user
-Explore Model Document
-What are the options in model.findOneAndUpdate method and explorer
-Api -Update the record using email id

-Explore schematype option from the documentation
-add require,unique,lowercase,min,minlength,trim
-Add default
-create a custom validate function for gender
-imporve the dv schema - put all appro

-Api Level Validate in patch and signup Request
-Data Sanitization Api Validation for each field
-install validator
-Explore the validator library
-never trust request.body data. we should validate data

-Validate data in Signup API
-Install bcrypt package
-Create PasswordHash using bcrypt.hash & save the user is encrypted password
-Create login Api
-Compare password and throw error if mails or password ininvalid

-install cookie-parser
-just send a dummy cookie to user
-Create Get/Profile Api and Check if you get the cookie back
-install jsonwebtoken
-IN login API, After email and password validation create a JWT token and send it back to user
-Read the cookies inside your profile API and find the logged in user.

-userAuth middleware
-Add the userAuth middleware in profile Api and new sendconnection Api
-Set the expiry of jwt token and cookies to 7 days

-Create userSchma method to getJWT()
-Create userschema method to veryfy password verification

-Explore Tinder APIS
-Create a list all API
-Group multiple routes under respective 

-Read document of express.router
-Create routes folder for managing auth,profile,request router
-create authRouter,ProfileRouter,RequestRouter
-Import there routers in app.js 

-Create Post/Logout API
-Create Patch /Profile/Edit
-Create Patch /Profile/Password API (Forgot Password API)
-Make you validate all data in evry POST and PATCH apis

-Create a connectionRequest Schema
-Add Proper validation
-Send Connection Request API
-Do proper validation
-$or query and $and query in mongoose
-Read article about compound index of mongodb
-Read more about index
-Why do we need index
-What is the advantage and disadvantages for creating index
-Schema.pre() function
-Read mongodb logical query pattern

