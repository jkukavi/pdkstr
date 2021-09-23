import React from "react";
import Notification from "./Notification";

const Notifications = ({ notifications }) => {
  return (
    <div className="notificationsContainer">
      {notifications.map((notification) => (
        <Notification notification={notification} />
      ))}
    </div>
  );
};

export default Notifications;
