const express = require('express');
const router = express.Router();

const { userRegister, userLogin, getUserProfile, updateUserProfile, updatePassword, resumeUpload, ResumeDelete, userLogout } = require('../Controller/userController');
const Protect = require('../Middleware/authMiddleware');
const { generalLimiter, authLimiter } = require('../Middleware/rateLimiter');
const upload = require('../Middleware/upload');
    
router.post('/candidate/register', authLimiter, userRegister);
router.post('/candidate/login', authLimiter, userLogin);
router.post('/candidate/logout', Protect, userLogout);
router.get('/candidate/profile', Protect, generalLimiter, getUserProfile);
router.put('/candidate/profileUpdate', Protect, generalLimiter, updateUserProfile);
router.put('/candidate/updatePassword', Protect, generalLimiter, updatePassword);
router.post('/candidate/resumeUpload', Protect, generalLimiter, upload.single('resume'), resumeUpload);
router.delete('/resume/delete', Protect, generalLimiter, ResumeDelete);
module.exports = router;