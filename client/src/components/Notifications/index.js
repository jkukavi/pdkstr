import React, { useState, useEffect } from "react";

import Notification from "./Notification";

const notificationsObserver = {
  push: null,
  subscribe: (fn) => {
    notificationsObserver.push = fn;
  },
};

export const notify = (newNotification) => {
  notificationsObserver.push(newNotification);
};

const Notifications = () => {
  const [notifications, setNotifications] = useState([]);

  const pushNotifications = (newNotification) => {
    setNotifications((notifications) => [...notifications, newNotification]);
  };

  const subscribeToNotifications = () => {
    notificationsObserver.subscribe(pushNotifications);
  };

  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(subscribeToNotifications, [setNotifications]);

  return (
    <div className="notificationsContainer">
      {notifications.map((notification) => (
        <Notification notification={notification} />
      ))}
    </div>
  );
};

export default Notifications;
