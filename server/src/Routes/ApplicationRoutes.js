const express = require('express');
const router = express.Router();

const { getApplications, getJobsWithApplications } = require('../Controller/ApplicationController');
const Protect = require('../Middleware/authMiddleware');

router.get('/applications', Protect, getApplications);
router.get('/jobs-with-applications', Protect, getJobsWithApplications);

module.exports = router;
