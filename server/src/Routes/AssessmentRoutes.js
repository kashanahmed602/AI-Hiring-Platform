const express = require('express');
const router = express.Router();

const { createAssessmentQuestions, getAssessments, statusUpdate, deleteAssessment, getAssessmentForCandidate, submitAssessment, getAssessmentResults, getAssessmentResultForSpecificJob } = require('../Controller/AssessmentController');
const Protect = require('../Middleware/authMiddleware');
const { generalLimiter, authLimiter } = require('../Middleware/rateLimiter');
    

router.post('/createAssessment', Protect, authLimiter, createAssessmentQuestions);
router.get('/recruiter/assessments', Protect, generalLimiter, getAssessments);
router.put('/recruiter/assessments/status', Protect, authLimiter, statusUpdate);
router.delete('/recruiter/assessments/delete', Protect, generalLimiter, deleteAssessment);
router.get('/candidate/assessments', Protect, generalLimiter, getAssessmentForCandidate);
router.post('/candidate/assessments/submit', Protect, authLimiter, submitAssessment);
router.get('/recruiter/assessments/results', Protect, generalLimiter, getAssessmentResults);
router.get('/assessments/results', Protect, generalLimiter, getAssessmentResultForSpecificJob);


module.exports = router;
