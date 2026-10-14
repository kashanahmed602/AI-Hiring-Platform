const { application } = require('express');
const mongoose = require('mongoose');

const interviewSchema = new mongoose.Schema({
    candidateId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Candidate',
        required: true
    },

    jobId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Job',
        required: true
    },

    applicationId:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Application',
        required: true
    },

    schedule: {
        type: Date,
        required: true
    },

    isCompleted: {
        type: Boolean,
        default: false
    },

    feedback: {
        type: String,
        default: ""
    },

    completedAt: {
        type: Date,
        default: null
    },
}, {
    timestamps: true
});

module.exports = mongoose.model('Interview', interviewSchema);