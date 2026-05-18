### AuthRouter
    POST /signUp
    POST /login
    POST /logout

### ProfileRouter
    Get /profile/view
    Patch /profile/edit
    PATCH /profile/password

### connectionRequestRouter
    POST /request/send/:status/:userId
    Note: Status is either interested,ignored

    POST /request/review/:status/:requestId
    Note:- Status is either accepted,rejected
### userRouter
    GET /user/requests/received
    GET /user/connection    
    Get /user/feed
    
   


Status: ignore,interested,accepted,rejected
