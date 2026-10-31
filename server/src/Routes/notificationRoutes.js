const express = require('express');
const router = express.Router();

const Protect = require('../Middleware/authMiddleware');
const { getNotifications, markNotificationAsRead } = require('../Controller/notificationController');

router.get('/candidate/notifications', Protect, getNotifications);

router.patch('/candidate/notifications/:notificationId/read', Protect, markNotificationAsRead);

module.exports = router;