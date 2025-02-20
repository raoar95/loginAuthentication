import React from "react";
import { createRoot } from "react-dom/client";

/* App */
import App from "./App";

/* Context */
import { ToastContextProvider } from "./context/toastProvider.context";
import { BrowserRouter } from "react-router-dom";

const container = document.getElementById("root");
const root = createRoot(container);
root.render(
  <React.StrictMode>
    <ToastContextProvider>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </ToastContextProvider>
  </React.StrictMode>
);
