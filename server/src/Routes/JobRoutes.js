const express = require('express');
const router = express.Router();
const { createJob, getJobs, deleteJob, updateJob, applyForJob, getJobsRecruiter } = require('../Controller/jobController');
const Protect = require('../Middleware/authMiddleware');
const { generalLimiter, authLimiter } = require('../Middleware/rateLimiter');

    
router.post('/createJob', Protect, authLimiter, createJob);
router.get('/jobs', Protect, generalLimiter, getJobs);
router.get('/recruiter/jobs', Protect, generalLimiter, getJobsRecruiter);
router.delete('/jobDeleted/:id', Protect, generalLimiter, deleteJob)
router.put('/jobUpdated/:id', Protect, generalLimiter, updateJob);
router.post('/applyForJob', Protect, generalLimiter, applyForJob);

module.exports = router;