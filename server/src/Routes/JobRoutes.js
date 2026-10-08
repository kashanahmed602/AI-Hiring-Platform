const express = require('express');
const router = express.Router();
const { createJob, getJobs, deleteJob, updateJob, applyForJob, getJobsRecruiter } = require('../Controller/jobController');
const Protect = require('../Middleware/authMiddleware');

router.post('/createJob', Protect, createJob);
router.get('/jobs', Protect, getJobs);
router.get('/recruiter/jobs', Protect, getJobsRecruiter);
router.delete('/jobDeleted/:id', Protect, deleteJob)
router.put('/jobUpdated/:id', Protect, updateJob);
router.post('/applyForJob', Protect, applyForJob);

module.exports = router;