const express = require('express');
const router = express.Router();

const { getApplications, getJobsWithApplications, updateStatus } = require('../Controller/ApplicationController');
const Protect = require('../Middleware/authMiddleware');

router.get('/applications', Protect, getApplications);
router.get('/jobs-with-applications', Protect, getJobsWithApplications);
router.put('/applications-status-update', Protect, updateStatus);

module.exports = router;
