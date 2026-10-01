const mongoose = require('mongoose');

const applicationSchema = new mongoose.Schema({
    jobId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Job',
        required: true
    },

    candidateId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },

    resumeSnapshot: {
        type: mongoose.Schema.Types.Mixed,
        required: true
    },

    matchScore: {
        type: Number,
        max: 100,
        min: 0,
        default: null
    },

    matchDetails: {
        skillsMatch: {
            type: Number,
            max: 1,
            min: 0,
            default: null
        },

        experienceMatch: {
            type: Number,
            max: 1,
            min: 0,
            default: null
        },

        educationMatch: {
            type: Number,
            max: 1,
            min: 0,
            default: null
        },

        workAlignment: {
        type: Number,
        min: 0,
        max: 1,
        default: null,
      },

        strengths: {
        type: [String],
        default: [],
      },

      missingSkills: {
        type: [String],
        default: [],
      },

      experienceGap: {
        type: String,
        default: null,
      },
    },

    status: {
        type: String,
        enum: ['applied', 'under-review', 'shortlisted', 'rejected', 'hired'],
        default: 'applied'
    },

    appliedAt: {
        type: Date,
        default: Date.now
    },

}, {
    timestamps: true
})