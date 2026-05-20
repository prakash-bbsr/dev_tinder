const mongoose = require('mongoose');
//Connect to the mongoose cluster
const connectDB = async() =>{    
    const dns = require("dns");
    dns.setServers(["8.8.8.8", "8.8.4.4"]);
    mongoose.connect(process.env.DB_CONNECTION_STRING);
};
module.exports = {connectDB};