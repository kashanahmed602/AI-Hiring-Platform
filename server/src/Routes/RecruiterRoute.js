const express = require('express');
const router = express.Router();

const { RecruiterRegister, RecruiterLogin, getRecruiterJobs } = require('../Controller/RecruiterController');
const Protect = require('../Middleware/authMiddleware');
const { generalLimiter, authLimiter } = require('../Middleware/rateLimiter');

router.post('/recruiter/register', authLimiter, RecruiterRegister);
router.post('/recruiter/login', authLimiter, RecruiterLogin);
router.get('/recruiter/jobs', Protect, generalLimiter, getRecruiterJobs);


module.exports = router;