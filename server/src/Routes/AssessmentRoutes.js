const express = require('express');
const router = express.Router();

const { createAssessmentQuestions, getAssessments, statusUpdate, deleteAssessment } = require('../Controller/AssessmentController');
const Protect = require('../Middleware/authMiddleware');

router.post('/createAssessment', Protect, createAssessmentQuestions);
router.get('/recruiter/assessments', Protect, getAssessments);
router.put('/recruiter/assessments/status', Protect, statusUpdate);
router.delete('/recruiter/assessments/delete', Protect, deleteAssessment);

module.exports = router;
