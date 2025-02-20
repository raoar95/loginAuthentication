import React, { useEffect, useState, memo, useCallback } from "react";
import "./Toast.scss";
import { FaCheckCircle } from "react-icons/fa";
import { MdError } from "react-icons/md";
import { IToast } from "../../context/toastProvider.context";

interface IToastProps extends IToast {
  setToast: React.Dispatch<React.SetStateAction<IToast>>;
}

const Toast = ({ isVisible, type, message, setToast }: IToastProps) => {
  const [closeAnimation, setCloseAnimation] = useState(false);
  const [toastVisible, setToastVisible] = useState(false);

  useEffect(() => {
    if (!isVisible) return;

    const showTimeout = setTimeout(() => setToastVisible(true), 50);
    const hideTimeout = setTimeout(() => setToastVisible(false), 3500);

    return () => {
      clearTimeout(showTimeout);
      clearTimeout(hideTimeout);
    };
  }, [isVisible]);

  const handleClose = useCallback(() => {
    setCloseAnimation(true);
    setTimeout(() => {
      setToast({ isVisible: false, type: "", message: "" });
    }, 800);
  }, [setToast]);

  const toastType = type.toLowerCase();

  return (
    <div
      className={`toast_container ${toastType} ${
        closeAnimation && "fade-out"
      } ${toastVisible ? "active" : ""}`}
    >
      <div className="toast_icon">
        {toastType === "success" && <FaCheckCircle />}
        {toastType === "error" && <MdError />}
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

export default memo(Toast);
