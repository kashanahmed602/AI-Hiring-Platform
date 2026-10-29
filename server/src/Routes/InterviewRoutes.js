const express = require('express');
const router = express.Router();

const { getApplicationsForInterview, createInterview, getInterviewsForRecruiter, getInterviewsForCandidate, allowCandidate  } = require('../Controller/InterviewController');
const Protect = require('../Middleware/authMiddleware');
const { generalLimiter, authLimiter } = require('../Middleware/rateLimiter');

router.get('/interviews', Protect, generalLimiter, getApplicationsForInterview);
router.post('/interview-create', Protect, authLimiter, createInterview);
router.get('/interviews/recruiter', Protect, generalLimiter, getInterviewsForRecruiter);
router.get('/interviews/candidate', Protect, generalLimiter, getInterviewsForCandidate);
router.patch("/interviews/:interviewId/allow-candidate", Protect, authLimiter, allowCandidate);

module.exports =  router;