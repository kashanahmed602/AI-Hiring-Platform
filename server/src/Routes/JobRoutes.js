const express = require('express');
const router = express.Router();
const { createJob } = require('../Controller/jobController');
const Protect = require('../Middleware/authMiddleware');

router.post('/createJob', Protect, createJob);

module.exports = router;