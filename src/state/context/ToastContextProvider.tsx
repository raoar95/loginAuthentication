import React, { createContext, useContext, useEffect, useState } from "react";
import Toast from "../../component/toast/Toast";

/** interface */
export interface IToast {
  isVisible: boolean;
  type: string;
  message: string;
}

interface IToastContext {
  toastSuccess: (message: string) => void;
  toastError: (message: string) => void;
}

const ToastContext = createContext<IToastContext | undefined>(undefined);

const ToastContextProvider = ({ children }) => {
  const [toast, setToast] = useState({
    isVisible: false,
    type: "",
    message: "",
  });

  const [isVisible, setIsVisible] = useState(false);

  // Updating `toast visibility` for `Toast` component.
  useEffect(() => {
    setIsVisible(toast.isVisible);
  }, [toast.isVisible]);

  // Auto Close after 4 seconds
  const closeToast = (): void => {
    setTimeout(
      () => setToast({ isVisible: false, type: "", message: "" }),
      4000
    );
  };

  // Success Toast
  const toastSuccess = (message: string): void => {
    setToast({ isVisible: true, type: "Success", message });
    closeToast();
  };

  // Error Toast
  const toastError = (message: string): void => {
    setToast({ isVisible: true, type: "Error", message });
    closeToast();
  };

  return (
    <ToastContext.Provider value={{ toastSuccess, toastError }}>
      {children}
      {toast.isVisible && (
        <Toast
          isVisible={isVisible}
          type={toast.type}
          message={toast.message}
          setToast={setToast}
        />
      )}
    </ToastContext.Provider>
  );
};

// Custom Hook
const useToast = () => {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error("useToast must be used within a ToastContextProvider");
  }
  return context;
};

export { ToastContextProvider, useToast };
