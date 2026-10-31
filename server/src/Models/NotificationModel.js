const mongoose =require('mongoose');

const notificationSchema = new mongoose.Schema({
    recipientId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        refPath: 'recipientModel'
    },

    recipientModel: {
        type: String,
        required: true,
        enum: ['Candidate', 'Recruiter']
    },

    message: {
        type: String,
        required: true
    },

    type: {
        type: String,
        required: true,
        enum: [
             'application_status',
             'interview_scheduled',
             'new_application',
        ],
    },

    relatedId: {
            type: mongoose.Schema.Types.ObjectId,
            default: null,
    },

    isRead: {
            type: Boolean,
            default: false,
    },
   
    
},
    {
        timestamps: true
    },
)

module.exports = mongoose.model("Notifications", notificationSchema);