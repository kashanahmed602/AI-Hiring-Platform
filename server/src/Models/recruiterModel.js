const mongoose = require('mongoose');


const recruiterModel = new mongoose.Schema({

    "Company Name":{
        type: String,
        required: true
    },

    email:{
        type: String,
        required: true,
    },

    password: {
        type: String,
        required: true
    },

    phone: {
        type: String,
        required: true
    },

    role: {
        type: String,
        anum:["candidate", "recruiter"],
        default: "recruiter"
    }
},
    {
        timeStamps: true
    }
)

module.exports = mongoose.model("Recruiter", recruiterModel)