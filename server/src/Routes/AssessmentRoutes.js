const express = require('express');
const router = express.Router();

const { createAssessmentQuestions, getAssessments, statusUpdate, deleteAssessment, getAssessmentForCandidate } = require('../Controller/AssessmentController');
const Protect = require('../Middleware/authMiddleware');

router.post('/createAssessment', Protect, createAssessmentQuestions);
router.get('/recruiter/assessments', Protect, getAssessments);
router.put('/recruiter/assessments/status', Protect, statusUpdate);
router.delete('/recruiter/assessments/delete', Protect, deleteAssessment);
router.get('/candidate/assessments', Protect, getAssessmentForCandidate);


module.exports = router;
