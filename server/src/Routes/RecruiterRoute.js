const express = require('express');
const router = express.Router();

const { RecruiterRegister, RecruiterLogin } = require('../Controller/RecruiterController');

router.post('/recruiter/register', RecruiterRegister);
router.post('/recruiter/login', RecruiterLogin);

module.exports = router;