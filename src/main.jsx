import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./main.css";
import { BrowserRouter } from "react-router-dom";
import { AuthProvider } from "./state/context/AuthProviderContext";
import { ToastContextProvider } from "./state/context/ToastContextProvider";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      <AuthProvider>
        <ToastContextProvider>
          <App />
        </ToastContextProvider>
      </AuthProvider>
    </BrowserRouter>
  </React.StrictMode>
);
