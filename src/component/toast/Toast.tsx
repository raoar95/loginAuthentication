import React, { useEffect, useState } from "react";
import "./Toast.css";
import { FaCheckCircle } from "react-icons/fa";
import { MdError } from "react-icons/md";

import { IToast } from "../../state/context/ToastContextProvider";

interface IToastProps extends IToast {
  setToast: React.Dispatch<React.SetStateAction<IToast>>;
}

const Toast = ({ isVisible, type, message, setToast }: IToastProps) => {
  const [closeAnimation, setCloseAnimation] = useState(false);
  const [toastVisible, setToastVisible] = useState(false);

  useEffect(() => {
    if (isVisible) {
      setTimeout(() => {
        setToastVisible(true);
      }, 50);
      setTimeout(() => {
        setToastVisible(false);
      }, 3500);
    }
  }, [isVisible]);

  const handleClose = () => {
    setCloseAnimation(true);
    setTimeout(() => {
      setToast({ isVisible: false, type: "", message: "" });
    }, 800);
  };

  return (
    <div
      className={`toast_container ${type.toLowerCase()} ${
        closeAnimation && "fade-out"
      } ${toastVisible ? "active" : ""}`}
    >
      <div className="toast_icon">
        {type.toLowerCase() === "success" && <FaCheckCircle />}
        {type.toLowerCase() === "error" && <MdError />}
      </div>
      <div className="toast_content">
        <p className="toast_type">{type}</p>
        <p className="toast_message">{message}</p>
      </div>
      <div className="toast_close" onClick={() => handleClose()}>
        ×
      </div>
    </div>
  );
};

export default Toast;
