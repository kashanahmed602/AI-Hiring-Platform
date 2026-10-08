const mongoose = require('mongoose');

const attemptedAssessmentSchema = new mongoose.Schema({
    assessmentId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Assessment',
        required: true
    },

    CandidateId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },

    score: {
        type: Number,
        required: true
    },

    status: {
        type: String,
        enum: ['Completed', 'In Progress', 'Not Started'],
        default: 'Not Started'
    },

    result: {
        type: String,
        enum: ['Pass', 'Fail', 'Pending'],
        default: 'Pending'
    },

    answers: [{
        questionId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: Assessment,
            required: true
        },

        answer:{
            type: String,
            default: null
        }
    }]
},
{
    timeStamps: true
}
)

module.exports = mongoose.model("Attempted Assements", attemptedAssessmentSchema);

