### AuthRouter
    POST /signUp
    POST /login
    POST /logout

### ProfileRouter
    Get /profile/view
    Patch /profile/edit
    PATCH /profile/password

### connectionRequestRouter
    POST /request/send/interested/:userId
    POST /requested/send/ignored/:userId
    POST /request/review/accepted/:requestId
    POST /request/review/rejected/:requestId

### userRouter
    Get /user/feed
    POST /user/sendConnection
    GET /user/connection


Status: ignore,interested,accepted,rejected
