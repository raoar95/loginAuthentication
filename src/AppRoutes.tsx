import React from "react";
import { Navigate, Route, Routes } from "react-router-dom";

/* Component */
import Login from "./pages/login";
import Dashboard from "./pages/dashboard";
import { AuthProvider } from "./context/authProvider.context";

const AppRoutes: React.FC = () => {
  return (
    <AuthProvider>
      <Routes>
        <Route path="/" element={<Navigate to="/loginAuthentication/" />} />
        <Route path="/loginAuthentication/dashboard" element={<Dashboard />} />
        <Route path="/loginAuthentication/" element={<Login />} />
        <Route
          path="/loginAuthentication/verify-otp/:otpID"
          element={<Login />}
        />
        <Route
          path="/loginAuthentication/reset-password/:resetToken"
          element={<Login />}
        />
      </Routes>
    </AuthProvider>
  );
};

export default AppRoutes;
