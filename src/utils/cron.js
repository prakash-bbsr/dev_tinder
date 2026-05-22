const cron = require('node-cron');
const ConnectionRequest = require("../models/connectionRequest")
const {subDays, startOfDay, endOfDay} = require("date-fns");
const sendEmail = require("./sendEmail");

cron.schedule('15 17 * * *', async() => {
  //console.log('running a task every minute');
  //Send email to all people who get requests the previous day
  try{
    const yesterDay = subDays(new Date(),1);
    const yesterdayStart = startOfDay(yesterDay);
    const yesterdayEnd = endOfDay(yesterDay);
    const pendingRequests = await ConnectionRequest.find({
      status:"interested",
      createdAt:{
        $gte:yesterdayStart,
        $lt:yesterdayEnd
      }    
  }).populate("fromUserId toUserId");
  // here populate get reference of user model

  const listOfEmails = new Set(pendingRequests.map(req=>req.toUserId.emailId))
  console.log(listOfEmails);
  for(const email of listOfEmails ){
    //send emails
    try{
      const subject =`New email request send for ${email}`;
      const body="This is the connection request body";
      const res = await sendEmail.run(subject,body);
      console.log(res);
    }catch(err){
      console.log(err);
    }
  }

  }catch(err){
    console.log(err);
  }  
});