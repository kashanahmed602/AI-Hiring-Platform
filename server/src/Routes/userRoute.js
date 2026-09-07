const express = require('express');
const router = express.Router();

const { userRegister, userLogin } = require('../Controller/userController');

router.post('/candidate/register', userRegister);
router.post('/candidate/login', userLogin);

module.exports = router;