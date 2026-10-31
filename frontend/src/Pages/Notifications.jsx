
import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  Bell,
  CheckCheck,
  Clock,
  BriefcaseBusiness,
  CalendarDays,
  Info,
  LoaderCircle,
  BellRing,
} from "lucide-react";

const API_URL =
  import.meta.env.VITE_API_URL || "http://localhost:8059/api/v1";

const Notifications = ({ socket }) => {
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // Fetch saved notifications from MongoDB
  const fetchNotifications = async () => {
    try {
      setLoading(true);
      setError("");

      const response = await axios.get(
        `${API_URL}/candidate/notifications`,
        { withCredentials: true }
      );

      if (response.data.success) {
        setNotifications(response.data.notifications || []);
      }
    } catch (err) {
      console.error("Fetch notifications error:", err);
      setError(
        err.response?.data?.message || "Unable to load notifications."
      );
    } finally {
      setLoading(false);
    }
  };

  // Load notifications when page opens
  useEffect(() => {
    fetchNotifications();
  }, []);

  // Listen for real-time notifications
  useEffect(() => {
    if (!socket) return;

    const handleNewNotification = (notification) => {
      setNotifications((prev) => {
        // Prevent duplicate notifications
        if (prev.some((item) => item._id === notification._id)) {
          return prev;
        }

        return [notification, ...prev];
      });
    };

    socket.on("new-notification", handleNewNotification);

    return () => {
      socket.off("new-notification", handleNewNotification);
    };
  }, [socket]);

  // Mark notification as read
  const markAsRead = async (notificationId) => {
    try {
      const response = await axios.patch(
        `${API_URL}/candidate/notifications/${notificationId}/read`,
        {},
        { withCredentials: true }
      );

      if (response.data.success) {
        setNotifications((prev) =>
          prev.map((notification) =>
            notification._id === notificationId
              ? { ...notification, isRead: true }
              : notification
          )
        );
      }
    } catch (err) {
      console.error("Mark as read error:", err);
    }
  };

  // Mark all unread notifications as read
  const markAllAsRead = async () => {
    const unreadNotifications = notifications.filter(
      (notification) => !notification.isRead
    );

    for (const notification of unreadNotifications) {
      await markAsRead(notification._id);
    }
  };

  const unreadCount = notifications.filter(
    (notification) => !notification.isRead
  ).length;

  const getNotificationIcon = (type) => {
    switch (type) {
      case "application_status":
        return <BriefcaseBusiness size={20} />;

      case "interview_scheduled":
        return <CalendarDays size={20} />;

      case "new_application":
        return <BellRing size={20} />;

      default:
        return <Info size={20} />;
    }
  };

  const formatDate = (date) => {
    const notificationDate = new Date(date);

    return notificationDate.toLocaleString("en-US", {
      day: "numeric",
      month: "short",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  return (
    <div className="min-h-screen bg-[#f8fafc] p-4 sm:p-6 lg:p-8">
      <div className="mx-auto max-w-5xl">

        {/* Header */}
        <div className="mb-8 flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
          <div>
            <div className="mb-2 flex items-center gap-2">
              <Bell className="text-violet-600" size={25} />
              <h1 className="text-2xl font-bold text-slate-800">
                Notifications
              </h1>
            </div>

            <p className="text-sm text-slate-500">
              Stay updated with your applications and interviews.
            </p>
          </div>

          {unreadCount > 0 && (
            <button
              onClick={markAllAsRead}
              className="flex items-center justify-center gap-2 rounded-lg border border-violet-200 bg-white px-4 py-2.5 text-sm font-semibold text-violet-700 transition hover:bg-violet-50"
            >
              <CheckCheck size={17} />
              Mark all as read
            </button>
          )}
        </div>

        {/* Stats */}
        <div className="mb-6 grid grid-cols-1 gap-4 sm:grid-cols-2">
          <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
            <p className="text-sm text-slate-500">Total Notifications</p>
            <h2 className="mt-2 text-2xl font-bold text-slate-800">
              {notifications.length}
            </h2>
          </div>

          <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
            <p className="text-sm text-slate-500">Unread Notifications</p>
            <h2 className="mt-2 text-2xl font-bold text-violet-600">
              {unreadCount}
            </h2>
          </div>
        </div>

        {/* Notification List */}
        <div className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm">
          <div className="border-b border-slate-100 px-5 py-4">
            <h2 className="font-semibold text-slate-800">
              Recent Activity
            </h2>
          </div>

          {loading ? (
            <div className="flex flex-col items-center justify-center py-16">
              <LoaderCircle
                className="animate-spin text-violet-600"
                size={30}
              />
              <p className="mt-3 text-sm text-slate-500">
                Loading notifications...
              </p>
            </div>
          ) : error ? (
            <div className="px-5 py-12 text-center">
              <p className="text-sm text-red-500">{error}</p>
              <button
                onClick={fetchNotifications}
                className="mt-4 rounded-lg bg-violet-600 px-4 py-2 text-sm font-semibold text-white hover:bg-violet-700"
              >
                Try Again
              </button>
            </div>
          ) : notifications.length === 0 ? (
            <div className="flex flex-col items-center justify-center px-5 py-16 text-center">
              <div className="rounded-full bg-violet-50 p-5">
                <Bell size={30} className="text-violet-500" />
              </div>

              <h3 className="mt-4 font-semibold text-slate-800">
                No notifications yet
              </h3>

              <p className="mt-2 max-w-sm text-sm text-slate-500">
                When there are updates about your applications or interviews,
                they will appear here.
              </p>
            </div>
          ) : (
            <div className="divide-y divide-slate-100">
              {notifications.map((notification) => (
                <div
                  key={notification._id}
                  className={`flex gap-4 px-5 py-5 transition hover:bg-slate-50 ${
                    !notification.isRead ? "bg-violet-50/50" : "bg-white"
                  }`}
                >
                  <div
                    className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-full ${
                      !notification.isRead
                        ? "bg-violet-100 text-violet-700"
                        : "bg-slate-100 text-slate-500"
                    }`}
                  >
                    {getNotificationIcon(notification.type)}
                  </div>

                  <div className="min-w-0 flex-1">
                    <div className="flex flex-wrap items-center gap-2">
                      <p className="font-semibold text-slate-800">
                        {notification.type
                          ?.replaceAll("_", " ")
                          .replace(/\b\w/g, (char) => char.toUpperCase())}
                      </p>

                      {!notification.isRead && (
                        <span className="rounded-full bg-violet-100 px-2 py-0.5 text-xs font-semibold text-violet-700">
                          New
                        </span>
                      )}
                    </div>

                    <p className="mt-1 text-sm leading-6 text-slate-600">
                      {notification.message}
                    </p>

                    <div className="mt-3 flex flex-wrap items-center justify-between gap-3">
                      <span className="flex items-center gap-1.5 text-xs text-slate-400">
                        <Clock size={13} />
                        {formatDate(notification.createdAt)}
                      </span>

                      {!notification.isRead && (
                        <button
                          onClick={() => markAsRead(notification._id)}
                          className="text-xs font-semibold text-violet-700 hover:text-violet-900"
                        >
                          Mark as read
                        </button>
                      )}
                    </div>
                  </div>

                  {!notification.isRead && (
                    <div className="mt-2 h-2 w-2 shrink-0 rounded-full bg-violet-600" />
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Notifications;
