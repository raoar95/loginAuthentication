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
        <Route path="/" element={<Login />} />
        <Route path="/verify-otp/:otpID" element={<Login />} />
        <Route path="/reset-password/:resetToken" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard />} />
      </Routes>
    </AuthProvider>
  );
};

export default AppRoutes;
