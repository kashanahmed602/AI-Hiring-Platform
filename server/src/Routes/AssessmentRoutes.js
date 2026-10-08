const express = require('express');
const router = express.Router();

const { createAssessmentQuestions } = require('../Controller/AssessmentController');
const Protect = require('../Middleware/authMiddleware');

router.post('/createAssessment', Protect, createAssessmentQuestions);

module.exports = router;
