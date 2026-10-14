const express = require('express');
const router = express.Router();

const { getApplicationsForInterview, createInterview, getInterviewsForRecruiter } = require('../Controller/InterviewController');
const Protect = require('../Middleware/authMiddleware');

router.get('/interviews', Protect, getApplicationsForInterview);
router.post('/interview-create', Protect, createInterview);
router.get('/interviews/recruiter', Protect, getInterviewsForRecruiter);

module.exports =  router;