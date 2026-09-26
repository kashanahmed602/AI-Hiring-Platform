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
    },

    resume: {
        fileName: String,
        fileUrl: String,
        fileId: String,
        uploadedAt: Date,

        parsingStatus: {
            type: String,
            enum: ["pending", "completed", "failed"],
            default: "pending"
        },

        parsedDate: Date,
        parsedVersion: String,
        extractedText: String,

       parsedData: {
    personal: {
        fullName: String,
        email: String,
        phone: String,
        location: String
    },

    professional: {
        headline: String,
        currentRole: String,
        yearsOfExperience: String
    },

    summary: String,

    skills: {
        type: [String],
        default: []
    },

    experience: [
        {
            company: String,
            role: String,
            employmentType: String,
            location: String,
            startDate: String,
            endDate: String,
            isCurrent: Boolean,
            description: String,
            responsibilities: [String],
            technologies: [String]
        }
    ],

    education: [
        {
            institution: String,
            degree: String,
            fieldOfStudy: String,
            startDate: String,
            endDate: String,
            location: String,
            isCurrent: Boolean
        }
    ],

    projects: [
        {
            name: String,
            description: String,
            technologies: [String],
            url: String
        }
    ],

    certifications: [
        {
            name: String,
            issuer: String,
            issueDate: String,
            expiryDate: String,
            credentialUrl: String
        }
    ],

    languages: [
        {
            name: String,
            proficiency: String
        }
    ],

    links: [
    {
        type: {
            type: String
        },
        url: {
            type: String
        }
    }
]
}
},

},
    {
        timestamps: true
    }
)

module.exports = mongoose.model("Candidate", userModel)