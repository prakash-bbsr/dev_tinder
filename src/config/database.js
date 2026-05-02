const mongoose = require('mongoose');
//Connect to the mongoose cluster
const connectDB = async() =>{
    const dns = require("dns");
    dns.setServers(["8.8.8.8", "8.8.4.4"]);
    mongoose.connect("mongodb+srv://pcn2007nayak_db_user:mrOycsVDQ4uCVXJz@prakashcluster.wqbw2tk.mongodb.net/students");
};
module.exports = {connectDB};