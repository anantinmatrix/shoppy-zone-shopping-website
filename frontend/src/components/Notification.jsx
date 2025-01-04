import "./css/Notification.css";
import { useEffect, useRef } from "react";

function Notification({ message, type, duration, onClose }) {
  const notificationRef = useRef(null);

  useEffect(() => {
    if (notificationRef) {
      notificationRef.current.style.transition = "all 0.3s ease";
      notificationRef.current.style.opacity = 1;

      setTimeout(() => {
        notificationRef.current.style.opacity = 0;
        notificationRef.current.style.visibility = "none";
      }, duration * 1000);
    }
  }, []);

  return (
    <div ref={notificationRef} className="notification ">
      <div className="notificationBox">
        <div className="message">
          <h6
            className="m-0"
            style={type === "error" ? { color: "red" } : { color: "green" }}
          >
            {message}
          </h6>
        </div>
        <div className="buttons">
          <button onClick={onclose} className="btn">
            <i className="fa-solid fa-xmark"></i>
          </button>
        </div>
      </div>
    </div>
  );
}

export default Notification;
