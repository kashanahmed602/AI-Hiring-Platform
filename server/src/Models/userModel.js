const mongoose = require('mongoose');


const userModel = new mongoose.Schema({

    name: {
        type: String,
        required: true
    },

    email: {
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
        default: "candidate"
    }

},
    {
        timestamps: true
    }
)

module.exports = mongoose.model("Candidate", userModel)