const express = require('express');
const router = express.Router();

const { getApplications } = require('../Controller/ApplicationController');
const Protect = require('../Middleware/authMiddleware');

router.get('/applications', Protect, getApplications);

module.exports = router;
