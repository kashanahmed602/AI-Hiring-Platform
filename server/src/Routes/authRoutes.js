const express = require('express');
const router = express.Router();

const Protect = require('../Middleware/authMiddleware');

router.get('/me', Protect, (req, res) => {
    res.status(200).json({message: 'User is authenticated', user: req.user});
});

module.exports = router;