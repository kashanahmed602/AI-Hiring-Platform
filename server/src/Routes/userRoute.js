const express = require('express');
const router = express.Router();

const { userRegister, userLogin, getUserProfile, updateUserProfile, updatePassword } = require('../Controller/userController');
const Protect = require('../Middleware/authMiddleware');

router.post('/candidate/register', userRegister);
router.post('/candidate/login', userLogin);
router.get('/candidate/profile', Protect, getUserProfile);
router.put('/candidate/profileUpdate', Protect, updateUserProfile);
router.put('/candidate/updatePassword', Protect, updatePassword);

module.exports = router;