const mongoose = require('mongoose');
//Connect to the mongoose cluster
const connectDB = async() =>{
    mongoose.connect("mongodb+srv://pcn2007nayak_db_user:mrOycsVDQ4uCVXJz@prakashcluster.wqbw2tk.mongodb.net/students");
};
module.exports = {connectDB};