const mongoose = require('mongoose');


const recruiterModel = new mongoose.Schema({

    Company:{
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
        enum:["candidate", "recruiter"],
        default: "recruiter"
    }
},
    {
        timestamps: true
    }
)

module.exports = mongoose.model("Recruiter", recruiterModel)