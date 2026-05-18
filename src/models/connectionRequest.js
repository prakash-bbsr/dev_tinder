const mongoose = require("mongoose");
const connectionRequestSchema = new mongoose.Schema({
    fromUserId:{
        type: mongoose.Schema.Types.ObjectId,
        required:true,
        ref:"User",
        index:true
    },
    toUserId:{
        type: mongoose.Schema.Types.ObjectId,
        required:true,
        ref:"User",
        index:true
    },
    status:{
        type: String,
        required:true,
        enum:{
            values:["ignored","interested","accepted","rejected"],
            message:`{VALUE} is incorrect status type`,
        }
    }
},
{timestamps: true}
);
//Compound Index
connectionRequestSchema.index({fromUserId:1,toUserId:1});


//Schema Level middleware which is executed just before save 
connectionRequestSchema.pre("save", async function () {
  if (this.fromUserId.equals(this.toUserId)) {
    throw new Error("Cannot send connection request to yourself");
  }
});
const ConnectionRequestModel = new mongoose.model("ConnectionRequest",connectionRequestSchema);
module.exports = ConnectionRequestModel;
