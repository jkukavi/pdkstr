import React, { useState, useEffect } from "react";

import Notification from "./Notification";

const notificationsObserver: {
  push: ((arg: any) => void) | null;
  subscribe: (fn: any) => void;
} = {
  push: null,
  subscribe: (fn: any) => {
    notificationsObserver.push = fn;
  },
};

export const notify = (newNotification: string) => {
  notificationsObserver.push?.(newNotification);
};

const Notifications = () => {
  const [notifications, setNotifications] = useState<string[]>([]);

  const pushNotifications = (newNotification: string) => {
    setNotifications((notifications) => [...notifications, newNotification]);
  };

  const subscribeToNotifications = () => {
    notificationsObserver.subscribe(pushNotifications);
  };

  useEffect(subscribeToNotifications, [setNotifications]);

  return (
    <div className="notificationsContainer">
      {notifications.map((notification, i) => (
        <Notification notification={notification} key={i} />
      ))}
    </div>
  );
};

export default Notifications;
