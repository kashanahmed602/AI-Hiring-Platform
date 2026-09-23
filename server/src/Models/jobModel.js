const mongoose = require("mongoose");

const jobSchema = new mongoose.Schema({
    
    Title: {
        type: String,
        required: true
    },

    Location: {
        type: String,
        required: true
    },

    JobType: {
        type: String,
        enum: ["Full-time", "Part-time", "Contract", "Internship"],
        default: "Full-time"
    },

    WorkMode: {
        type: String,
        enum: ["On-site", "Remote", "Hybrid"],
        default: "On-site"
    },

    Salary: {
        type: String,
        required: true
    },

    Experience: {
        type: String,
        required: true
    },

    RequiredSkills: {
        type: [String],
        required: true
    },

    Description: {
        type: String,
        required: true
    },

    CreatedBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Recruiter",
        required: true
    },
},
{
    timestamps: true
}
)

module.exports = mongoose.model("Job", jobSchema);