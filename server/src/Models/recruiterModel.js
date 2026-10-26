const mongoose = require('mongoose');


const recruiterModel = new mongoose.Schema({

    Company:{
        type: String,
        default: ""
    },

    email:{
        type: String,
        required: true,
        unique: true,
        trim: true,
    },

    password: {
        type: String,
        required: true
    },

    phone: {
        type: String,
        default: ""
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