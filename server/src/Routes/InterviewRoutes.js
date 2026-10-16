const express = require('express');
const router = express.Router();

const { getApplicationsForInterview, createInterview, getInterviewsForRecruiter, getInterviewsForCandidate, allowCandidate  } = require('../Controller/InterviewController');
const Protect = require('../Middleware/authMiddleware');

router.get('/interviews', Protect, getApplicationsForInterview);
router.post('/interview-create', Protect, createInterview);
router.get('/interviews/recruiter', Protect, getInterviewsForRecruiter);
router.get('/interviews/candidate', Protect, getInterviewsForCandidate);
router.patch("/interviews/:interviewId/allow-candidate", Protect, allowCandidate);

module.exports =  router;