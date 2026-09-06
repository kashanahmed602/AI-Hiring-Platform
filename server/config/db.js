const mongoose = require('mongoose');
require('dotenv').config();

const connectDB = async () => {
    try{
        await mongoose.connect(process.env.MONGODB_URI);

        console.log('DataBase connected successfully');
    }catch(error){

        console.log(`Error connecting to MongoDB: ${error.message}`);
    }
}

module.exports = connectDB;