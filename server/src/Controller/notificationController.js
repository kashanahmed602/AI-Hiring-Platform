const Notifications = require('../Models/NotificationModel');

// Get candidate notifications
const getNotifications = async (req, res) => {
    try {
        const notifications = await Notifications.find({
            recipientId: req.user.id,
            recipientModel: 'Candidate'
        }).sort({ createdAt: -1 });

        return res.status(200).json({
            success: true,
            notifications
        });

    } catch (error) {
        console.error("Get Notifications Error:", error);

        return res.status(500).json({
            success: false,
            message: "Internal Server Error"
        });
    }
};


// Mark notification as read
const markNotificationAsRead = async (req, res) => {
    try {
        const { notificationId } = req.params;

        const notification = await Notifications.findOne({
            _id: notificationId,
            recipientId: req.user.id,
            recipientModel: 'Candidate'
        });

        if (!notification) {
            return res.status(404).json({
                success: false,
                message: "Notification not found"
            });
        }

        notification.isRead = true;
        await notification.save();

        return res.status(200).json({
            success: true,
            message: "Notification marked as read",
            notification
        });

    } catch (error) {
        console.error("Mark Notification Error:", error);

        return res.status(500).json({
            success: false,
            message: "Internal Server Error"
        });
    }
};


module.exports = {
    getNotifications,
    markNotificationAsRead
};