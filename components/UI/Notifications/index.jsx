import React from "react";
import ReactDOM from "react-dom";

import { useSelector } from "react-redux";

// Components
import NotificationItem from "./item";

const Notifications = () => {
  const notifications = []; /*useSelector(
    (state) => state.notification.notifications
  );*/

  if (typeof document === "undefined") {
    return null;
  }

  return ReactDOM.createPortal(
    <div className="w-72 fixed top-20 right-4 z-70">
      {notifications.slice(0, 3).map((not) => (
        <NotificationItem {...not} key={not.id} />
      ))}
    </div>,
    document.getElementById("notifications-placeholder")
  );
};

export default Notifications;
