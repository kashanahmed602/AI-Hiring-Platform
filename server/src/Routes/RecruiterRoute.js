const express = require('express');
const router = express.Router();

const { RecruiterRegister, RecruiterLogin, getRecruiterJobs } = require('../Controller/RecruiterController');
const Protect = require('../Middleware/authMiddleware');

router.post('/recruiter/register', RecruiterRegister);
router.post('/recruiter/login', RecruiterLogin);
router.get('/recruiter/jobs', Protect, getRecruiterJobs);


module.exports = router;