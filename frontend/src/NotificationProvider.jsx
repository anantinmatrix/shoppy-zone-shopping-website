import { createContext, useContext, useEffect, useState } from "react";
import Notification from "./components/Notification";

const NotificationContext = createContext();

export const useNotification = () => {
  return useContext(NotificationContext);
};

let showNotificationFunc;

export const NotificationProvider = ({ children }) => {
  const [notificationMessage, setNotificationMessage] = useState("");
  const [notificationType, setNotificationType] = useState("");
  const [notificationDuration, setNotificationDuration] = useState(0);

  const showNotifications = (type, message, duration) => {
    setNotificationMessage(message);
    setNotificationType(type);
    setNotificationDuration(duration);
  };

  showNotificationFunc = showNotifications;

  const handleClose = () => {
    setNotificationMessage("");
    setNotificationType("");
    setNotificationDuration(0);
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      handleClose();
    }, notificationDuration * 1000);

    return () => {
      clearTimeout(timer);
    };
  }, [notificationDuration]);

  return (
    <NotificationContext.Provider value={showNotifications}>
      {children}
      {notificationMessage ? (
        <Notification
          message={notificationMessage}
          type={notificationType}
          duration={notificationDuration}
          onclose = {handleClose}
        />
      ) : null}
    </NotificationContext.Provider>
  );
};

export const showNotification = (...args) => {
  if (showNotificationFunc) {
    showNotificationFunc(...args);
  } else {
    console.log(`couldn't show notification message`);
  }
};
