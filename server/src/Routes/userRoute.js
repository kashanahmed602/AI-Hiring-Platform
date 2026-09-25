const express = require('express');
const router = express.Router();

const { userRegister, userLogin, getUserProfile, updateUserProfile, updatePassword, resumeUpload } = require('../Controller/userController');
const Protect = require('../Middleware/authMiddleware');
const upload = require('../Middleware/upload');

router.post('/candidate/register', userRegister);
router.post('/candidate/login', userLogin);
router.get('/candidate/profile', Protect, getUserProfile);
router.put('/candidate/profileUpdate', Protect, updateUserProfile);
router.put('/candidate/updatePassword', Protect, updatePassword);
router.post('/candidate/resumeUpload', Protect, upload.single('resume'), resumeUpload);

module.exports = router;