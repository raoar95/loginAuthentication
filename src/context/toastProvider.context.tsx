import React, {
  useState,
  useEffect,
  useContext,
  createContext,
  lazy,
  Suspense,
  ReactNode,
  useMemo,
} from "react";

const Toast = lazy(() => import("../components/Toast/Toast"));

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

const ToastContext = createContext<IToastContext | null>(null);

const ToastContextProvider = ({ children }: { children: ReactNode }) => {
  const [toast, setToast] = useState({
    isVisible: false,
    type: "",
    message: "",
  });

  const [isVisible, setIsVisible] = useState(false);

  // Auto Close Toast after 4 seconds
  useEffect(() => {
    setIsVisible(toast.isVisible);
    if (toast.isVisible) {
      const timer = setTimeout(() => {
        setToast({ isVisible: false, type: "", message: "" });
      }, 4000);
      return () => clearTimeout(timer);
    }
  }, [toast.isVisible]);

  // Success Toast
  const toastSuccess = (message: string): void => {
    setToast({ isVisible: true, type: "Success", message });
  };

  // Error Toast
  const toastError = (message: string): void => {
    setToast({ isVisible: true, type: "Error", message });
  };

  const toastActions = useMemo(() => ({ toastSuccess, toastError }), []);

  return (
    <ToastContext.Provider value={toastActions}>
      {children}
      {toast.isVisible && (
        <Suspense fallback={null}>
          <Toast
            isVisible={toast.isVisible}
            type={toast.type}
            message={toast.message}
            setToast={setToast}
          />
        </Suspense>
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
