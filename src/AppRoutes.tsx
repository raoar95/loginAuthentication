import React from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import Dashboard from "./component/dashboard";
import AuthForm from "./component/LoginRegisterForm";
// import { ProtectedRoute, UnProtectedRoute } from "./utils/RouteHandler";

const AppRoutes: React.FC = () => {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/loginAuthentication/" />} />
      <Route path="/loginAuthentication/" element={<AuthForm />} />
      <Route path="/loginAuthentication/dashboard" element={<Dashboard />} />

      {/* <ProtectedRoute path="/login" element={<AuthForm />} />
      <UnProtectedRoute path="/dashboard" element={<Dashboard />} /> */}
    </Routes>
  );
};

export default AppRoutes;
