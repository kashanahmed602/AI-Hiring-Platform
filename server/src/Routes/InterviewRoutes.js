const express = require('express');
const router = express.Router();

const { getApplicationsForInterview } = require('../Controller/InterviewController');
const Protect = require('../Middleware/authMiddleware');

router.get('/interviews', Protect, getApplicationsForInterview);

module.exports =  router;