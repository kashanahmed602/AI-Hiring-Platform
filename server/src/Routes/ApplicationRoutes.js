const express = require('express');
const router = express.Router();

const { getApplications, getJobsWithApplications, updateStatus } = require('../Controller/ApplicationController');
const Protect = require('../Middleware/authMiddleware');
const { generalLimiter, authLimiter } = require('../Middleware/rateLimiter');

router.get('/applications', Protect, generalLimiter, getApplications);
router.get('/jobs-with-applications', Protect, generalLimiter, getJobsWithApplications);
router.put('/applications-status-update', Protect, generalLimiter, updateStatus);

module.exports = router;
